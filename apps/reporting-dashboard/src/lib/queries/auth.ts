import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import type { Client, ClientUser } from '@/lib/types'

export async function getClientUser(): Promise<{
  user: { id: string; email: string }
  clientUser: ClientUser
  client: Client | null
}> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Use order + limit instead of .single() — a user may have multiple records
  // (e.g., admin row with null client_id + a client row). Prefer the one with a client_id.
  const { data: clientUsers } = await supabase
    .from('client_users')
    .select('*')
    .eq('user_id', user.id)
    .order('client_id', { ascending: false, nullsFirst: false })

  const clientUser = clientUsers?.[0] ?? null

  if (!clientUser) {
    redirect('/login?reason=no_access')
  }

  let client: Client | null = null
  if (clientUser.client_id) {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientUser.client_id)
      .single()
    client = data
  }

  return {
    user: { id: user.id, email: user.email || '' },
    clientUser: clientUser as ClientUser,
    client: client as Client | null,
  }
}

export async function requireAdmin(): Promise<{ user: { id: string; email: string }; clientUser: ClientUser }> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Find admin record — user may have multiple client_users rows
  const { data: clientUsers } = await supabase
    .from('client_users')
    .select('*')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1)

  const clientUser = clientUsers?.[0] ?? null

  if (!clientUser) {
    redirect('/dashboard')
  }

  return {
    user: { id: user.id, email: user.email || '' },
    clientUser: clientUser as ClientUser,
  }
}
