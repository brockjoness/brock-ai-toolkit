import { createServerSupabaseClient } from '@/lib/supabase-server'

export interface Persona {
  id: string
  client_id: string
  name: string
  description: string | null
  demographics: string | null
  pain_points: string | null
  motivations: string | null
  buying_triggers: string | null
  communication_style: string | null
  created_at: string
}

export async function fetchPersonas(clientId: string): Promise<Persona[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}
