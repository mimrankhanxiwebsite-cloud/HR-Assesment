import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { user_id, resume_text } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) throw new Error('OpenAI key not configured')

    const systemPrompt = `You are an expert HR and technical recruiter. 
    Parse the given resume/CV text and extract structured information.
    
    Return valid JSON in this exact format:
    {
      "first_name": "",
      "last_name": "",
      "headline": "",
      "location": "",
      "years_of_experience": 0,
      "experience_level": "junior|mid|senior|advanced",
      "skills": ["skill1", "skill2"],
      "linkedin_url": "",
      "github_url": "",
      "portfolio_url": "",
      "certifications": ["cert1"],
      "education": [{"degree": "", "institution": "", "year": 0}],
      "experience": [{"title": "", "company": "", "duration": ""}]
    }`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Parse this resume:\n\n${resume_text}` },
        ],
        max_tokens: 1500,
        temperature: 0.1,
      }),
    })

    const aiData = await res.json()
    const parsed = JSON.parse(aiData.choices[0].message.content)

    // Persist to DB if user_id provided
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    if (user_id) {
      // Update users table
      await supabase.from('users').update({
        first_name: parsed.first_name,
        last_name: parsed.last_name,
      }).eq('id', user_id)

      // Upsert candidates profile
      await supabase.from('candidates').upsert({
        user_id,
        headline: parsed.headline,
        location: parsed.location,
        linkedin_url: parsed.linkedin_url,
        github_url: parsed.github_url,
        portfolio_url: parsed.portfolio_url,
        years_of_experience: parsed.years_of_experience,
        experience_level: parsed.experience_level,
      })

      // Insert skills (deduplicated)
      for (const skillName of (parsed.skills || [])) {
        // Find or create skill
        let { data: skill } = await supabase
          .from('skills')
          .select('id')
          .eq('name', skillName)
          .single()

        if (!skill) {
          const { data: newSkill } = await supabase
            .from('skills')
            .insert({ name: skillName, category: 'Other' })
            .select('id')
            .single()
          skill = newSkill
        }

        if (skill) {
          await supabase.from('candidate_skills').upsert({
            candidate_id: user_id,
            skill_id: skill.id,
            proficiency_level: 'intermediate',
            verified: false,
          })
        }
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
