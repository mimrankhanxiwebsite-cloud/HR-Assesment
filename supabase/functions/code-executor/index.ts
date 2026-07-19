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
    const { code, language, stdin, expected_output } = await req.json()

    // Call Piston API (free, open-source code execution)
    const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: '*',
        files: [{ content: code }],
        stdin: stdin || '',
      }),
    })

    const result = await pistonRes.json()

    const output = result.run?.stdout || ''
    const stderr = result.run?.stderr || ''
    const exitCode = result.run?.code ?? 0

    // Evaluate against expected output
    const passed = expected_output
      ? output.trim() === expected_output.trim()
      : exitCode === 0

    return new Response(
      JSON.stringify({
        output,
        stderr,
        exitCode,
        passed,
        executionTime: result.run?.cpu_time || 0,
        memoryUsed: result.run?.memory || 0,
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
