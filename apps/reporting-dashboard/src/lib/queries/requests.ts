import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { ClientRequest } from '@/lib/types'

export async function fetchClientRequests(clientId: string): Promise<ClientRequest[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('client_requests')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}
