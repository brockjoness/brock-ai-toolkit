import { createServerSupabaseClient } from '@/lib/supabase-server'

export interface PlatformConnection {
  id: string
  client_id: string
  platform: string
  status: string
  account_identifier: string | null
  connected_at: string | null
  last_sync_at: string | null
  last_error: string | null
}

export async function fetchPlatformConnections(clientId: string): Promise<PlatformConnection[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('client_id', clientId)
    .order('platform')
  return data || []
}
