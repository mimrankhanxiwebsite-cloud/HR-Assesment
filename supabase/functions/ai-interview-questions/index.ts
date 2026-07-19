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
    const { attempt_id } = await req.json()
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) throw new Error('OpenAI key not configured')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Fetch the candidate's assessment attempt data
    const { data: attempt } = await supabase
      .from('assessment_attempts')
      .select(`
        score_composite,
        score_technical,
        score_coding,
        assessments(title, difficulty, category),
        code_reviews(summary, improvements)
      `)
      .eq('id', attempt_id)
      .single()

    const attemptData = {
      assessment: attempt?.assessments?.title,
      difficulty: attempt?.assessments?.difficulty,
      scores: {
        composite: attempt?.score_composite,
        technical: attempt?.score_technical,
        coding: attempt?.score_coding,
      },
      code_weaknesses: attempt?.code_reviews?.[0]?.improvements || []
    }

    const systemPrompt = `You are an expert technical interviewer. 
    Analyze the candidate's technical assessment scores and their identified coding weaknesses.
    Generate exactly 3 highly targeted interview questions that a hiring manager should ask this candidate to probe their specific weaknesses and verify their depth of knowledge.
    
    Return valid JSON in this exact format:
    {
      "interview_questions": [
        {
          "question": "The interview question",
          "intent": "What this question aims to evaluate based on their test results.",
          "what_to_look_for": "Key signals the interviewer should listen for in a good answer."
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
          { role: 'user', content: `Assessment Results:\n${JSON.stringify(attemptData, null, 2)}` },
        ],
        max_tokens: 1000,
        temperature: 0.4,
      }),
    })

    const aiData = await res.json()
    const result = JSON.parse(aiData.choices[0].message.content)

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
