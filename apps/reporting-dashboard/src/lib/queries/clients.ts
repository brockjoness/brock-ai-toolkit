import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Client, OnboardingSubmission, ClientRequest } from '@/lib/types'

export async function fetchAllClients(): Promise<Client[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export async function fetchClientBySlug(slug: string): Promise<Client | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export async function fetchAllOnboardingSubmissions(): Promise<OnboardingSubmission[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('onboarding_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export async function fetchAllRequests(): Promise<(ClientRequest & { client_name?: string })[]> {
  const supabase = await createServerSupabaseClient()
  const { data: requests, error } = await supabase
    .from('client_requests')
    .select('*, clients(name)')
    .order('created_at', { ascending: false })

  if (error || !requests) return []
  return requests.map((r: any) => ({
    ...r,
    client_name: r.clients?.name || 'Unknown',
    clients: undefined,
  }))
}

export async function fetchClientNotes(clientId: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('client_notes')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

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

export async function fetchAgencyStats() {
  const supabase = await createServerSupabaseClient()

  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, mrr, pipeline_stage, status')

  if (error || !clients) return { totalClients: 0, activeClients: 0, totalMrr: 0, pipelineCounts: {} }

  const activeClients = clients.filter(c => c.status === 'active')
  const totalMrr = clients.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0)

  const pipelineCounts: Record<string, number> = {}
  for (const c of clients) {
    const stage = c.pipeline_stage || 'active'
    pipelineCounts[stage] = (pipelineCounts[stage] || 0) + 1
  }

  return {
    totalClients: clients.length,
    activeClients: activeClients.length,
    totalMrr,
    pipelineCounts,
  }
}
