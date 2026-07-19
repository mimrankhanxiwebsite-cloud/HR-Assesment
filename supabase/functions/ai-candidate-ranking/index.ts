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
    const { organization_id, top_n = 10, skill_filters = [] } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Fetch candidates with completed assessments
    let query = supabase
      .from('assessment_attempts')
      .select(`
        candidate_id,
        score_composite,
        score_technical,
        score_coding,
        candidates(
          user_id,
          headline,
          experience_level,
          years_of_experience,
          users(first_name, last_name, email)
        )
      `)
      .eq('status', 'completed')
      .not('score_composite', 'is', null)
      .order('score_composite', { ascending: false })
      .limit(top_n * 5) // fetch more to deduplicate

    const { data: attempts } = await query

    if (!attempts) {
      return new Response(JSON.stringify({ rankings: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Deduplicate by candidate, keep highest score
    const candidateMap = new Map()
    for (const attempt of attempts) {
      const cid = attempt.candidate_id
      if (!candidateMap.has(cid) || attempt.score_composite > candidateMap.get(cid).score_composite) {
        candidateMap.set(cid, attempt)
      }
    }

    const rankings = Array.from(candidateMap.values())
      .sort((a, b) => b.score_composite - a.score_composite)
      .slice(0, top_n)
      .map((a, index) => ({
        rank: index + 1,
        candidate_id: a.candidate_id,
        name: `${a.candidates?.users?.first_name} ${a.candidates?.users?.last_name}`,
        email: a.candidates?.users?.email,
        headline: a.candidates?.headline,
        experience_level: a.candidates?.experience_level,
        years_of_experience: a.candidates?.years_of_experience,
        composite_score: a.score_composite,
        technical_score: a.score_technical,
        coding_score: a.score_coding,
      }))

    return new Response(JSON.stringify({ rankings, total: rankings.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
