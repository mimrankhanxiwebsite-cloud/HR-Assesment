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
    const { candidate_id } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) throw new Error('OpenAI key not configured')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Fetch candidate profile and past assessments
    const { data: candidate } = await supabase
      .from('candidates')
      .select('headline, experience_level, years_of_experience, candidate_skills(skills(name))')
      .eq('user_id', candidate_id)
      .single()

    const { data: attempts } = await supabase
      .from('assessment_attempts')
      .select('score_composite, assessments(title, category)')
      .eq('candidate_id', candidate_id)
      .eq('status', 'completed')

    const profileData = {
      headline: candidate?.headline,
      level: candidate?.experience_level,
      yoe: candidate?.years_of_experience,
      skills: candidate?.candidate_skills?.map((cs: any) => cs.skills?.name) || [],
      history: attempts?.map((a: any) => `${a.assessments?.title} (${a.score_composite}%)`) || []
    }

    const systemPrompt = `You are an expert technical career coach. 
    Analyze the candidate's profile, current skills, and assessment history to recommend 3-5 new skills they should learn next to advance their career.
    
    Return valid JSON in this exact format:
    {
      "recommendations": [
        {
          "skill": "Skill Name",
          "reasoning": "1-2 sentences on why this is a logical next step based on their profile.",
          "priority": "high|medium|low"
        }
      ]
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
          { role: 'user', content: `Profile:\n${JSON.stringify(profileData, null, 2)}` },
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    })

    const aiData = await res.json()
    const recommendations = JSON.parse(aiData.choices[0].message.content)

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
