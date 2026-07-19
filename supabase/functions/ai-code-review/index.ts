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
    const { submission_id, code, language, question_title } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) throw new Error('OpenAI key not configured')

    const systemPrompt = `You are an expert senior software engineer conducting a technical code review. 
    Analyze the submitted code for a coding assessment and provide a structured review.
    Your review must be concise, constructive, and evaluate the following dimensions:
    1. Correctness (0-100): Does the code solve the problem?
    2. Code Quality (0-100): Readability, naming conventions, comments.
    3. Efficiency (0-100): Time & space complexity analysis.
    4. Security (0-100): Any security vulnerabilities or unsafe patterns.
    5. Best Practices (0-100): Industry standards adherence.
    
    Return valid JSON in this exact format:
    {
      "scores": { "correctness": 0, "quality": 0, "efficiency": 0, "security": 0, "best_practices": 0 },
      "composite_score": 0,
      "summary": "Brief 2-3 sentence overall summary.",
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1", "improvement2"],
      "time_complexity": "O(?)",
      "space_complexity": "O(?)"
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
          { role: 'user', content: `Question: "${question_title}"\n\nLanguage: ${language}\n\nCode:\n\`\`\`\n${code}\n\`\`\`` },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    const aiData = await res.json()
    const review = JSON.parse(aiData.choices[0].message.content)

    // Persist review to DB
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    if (submission_id) {
      await supabase.from('code_reviews').upsert({
        submission_id,
        reviewer_type: 'ai',
        score_correctness: review.scores.correctness,
        score_quality: review.scores.quality,
        score_efficiency: review.scores.efficiency,
        score_security: review.scores.security,
        score_best_practices: review.scores.best_practices,
        composite_score: review.composite_score,
        summary: review.summary,
        strengths: review.strengths,
        improvements: review.improvements,
        time_complexity: review.time_complexity,
        space_complexity: review.space_complexity,
        reviewed_at: new Date().toISOString(),
      })
    }

    return new Response(JSON.stringify(review), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
