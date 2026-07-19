import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Randomize and pick N items from array
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, arr.length))
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { assessment_id, candidate_id } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 1. Get assessment metadata
    const { data: assessment, error: asmtErr } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessment_id)
      .single()

    if (asmtErr || !assessment) {
      return new Response(JSON.stringify({ error: 'Assessment not found' }), { status: 404, headers: corsHeaders })
    }

    // 2. Get question pool from assessment_configs
    const { data: configs } = await supabase
      .from('assessment_configs')
      .select('question_id, weight, is_required, questions(*, question_options(*))')
      .eq('assessment_id', assessment_id)

    // 3. Separate required vs optional questions
    const required = (configs || []).filter(c => c.is_required).map(c => c.questions)
    const optional = (configs || []).filter(c => !c.is_required).map(c => c.questions)

    // 4. Randomize optional questions to fill slots
    const totalSlots = assessment.questions_per_exam || 20
    const optionalCount = Math.max(0, totalSlots - required.length)
    
    // Balance: 60% MCQ/T/F, 40% coding for coding assessments
    const codingQuestions = optional.filter(q => q?.type === 'coding')
    const theoryQuestions = optional.filter(q => q?.type !== 'coding')
    
    const codingSlots = Math.floor(optionalCount * 0.4)
    const theorySlots = optionalCount - codingSlots
    
    const selectedQuestions = [
      ...required,
      ...pickRandom(theoryQuestions, theorySlots),
      ...pickRandom(codingQuestions, codingSlots),
    ].filter(Boolean)

    // 5. Shuffle final question order
    const shuffled = pickRandom(selectedQuestions, selectedQuestions.length)

    // 6. Create the attempt with question snapshot
    const { data: attempt, error: attemptErr } = await supabase
      .from('assessment_attempts')
      .insert({
        assessment_id,
        candidate_id,
        status: 'in_progress',
        started_at: new Date().toISOString(),
        question_snapshot: shuffled.map(q => q.id),
        security_flags: { tab_switches: 0, copy_paste_count: 0, fullscreen_exits: 0 },
      })
      .select()
      .single()

    if (attemptErr) throw new Error(attemptErr.message)

    return new Response(
      JSON.stringify({
        attempt_id: attempt.id,
        questions: shuffled,
        duration_minutes: assessment.duration_minutes,
        total_questions: shuffled.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
