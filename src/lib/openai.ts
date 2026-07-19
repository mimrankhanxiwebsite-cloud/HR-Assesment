import { supabase } from './supabase'

/**
 * Helper to call Supabase Edge Functions which interact with OpenAI.
 * We do not store OpenAI keys on the client.
 */
export async function callAIFunction(functionName: string, payload: any) {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
