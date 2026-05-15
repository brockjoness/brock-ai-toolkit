'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateRequestStatus(requestId: string, status: string) {
  const supabase = await createServerSupabaseClient()

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  await supabase
    .from('client_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', requestId)

  revalidatePath('/admin/requests')
}

export async function updateOnboardingStatus(submissionId: string, status: string) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  await supabase
    .from('onboarding_submissions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', submissionId)

  revalidatePath('/admin/onboarding')
}

export async function createClientFromSubmission(submissionId: string) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  // Get the submission
  const { data: submission } = await supabase
    .from('onboarding_submissions')
    .select('*')
    .eq('id', submissionId)
    .single()

  if (!submission) throw new Error('Submission not found')

  // Create slug from company name
  const slug = submission.company_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  // Create client record
  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      name: submission.company_name,
      slug,
      agency_slug: 'clickflow',
      meta_account_id: submission.meta_account_id,
      google_customer_id: submission.google_customer_id,
      klaviyo_api_key: submission.klaviyo_api_key,
      shopify_store: submission.shopify_store,
      monthly_budget: submission.monthly_budget,
      roas_target: submission.roas_target,
      status: 'active',
      pipeline_stage: 'onboarding',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  // Link submission to client
  await supabase
    .from('onboarding_submissions')
    .update({ client_id: client.id, status: 'completed' })
    .eq('id', submissionId)

  // Create client_users entry for the submitter
  if (submission.submitted_by) {
    await supabase
      .from('client_users')
      .insert({
        user_id: submission.submitted_by,
        client_id: client.id,
        role: 'client',
      })
  }

  // Create platform connection entries
  const platforms = submission.platforms || []
  for (const platform of platforms) {
    let accountId = null
    if (platform === 'meta') accountId = submission.meta_account_id
    if (platform === 'google') accountId = submission.google_customer_id
    if (platform === 'klaviyo') accountId = submission.klaviyo_api_key
    if (platform === 'shopify') accountId = submission.shopify_store

    await supabase
      .from('platform_connections')
      .insert({
        client_id: client.id,
        platform,
        status: accountId ? 'pending' : 'disconnected',
        account_identifier: accountId,
      })
  }

  revalidatePath('/admin/onboarding')
  revalidatePath('/admin/clients')
  return client
}

export async function addClientNote(clientId: string, content: string) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  await supabase
    .from('client_notes')
    .insert({
      client_id: clientId,
      author_id: user.id,
      content,
    })

  revalidatePath('/admin/clients')
}

export async function updateClient(clientId: string, fields: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  const allowedFields = [
    'name', 'status', 'pipeline_stage', 'monthly_budget', 'roas_target', 'cpa_target',
    'meta_account_id', 'google_customer_id', 'klaviyo_api_key', 'shopify_store',
    'agency_slug', 'mrr',
  ]
  const sanitized: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(fields)) {
    if (allowedFields.includes(key)) sanitized[key] = val
  }

  const { error } = await supabase
    .from('clients')
    .update(sanitized)
    .eq('id', clientId)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/clients')
}

export async function seedDemoData(clientId: string) {
  const { generateMetricsData, generateKlaviyoData, generateShopifyData } = await import('@/lib/seed-demo-data')
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  // Clear existing demo data for this client
  await supabase.from('client_metrics').delete().eq('client_id', clientId)
  await supabase.from('klaviyo_metrics').delete().eq('client_id', clientId)
  await supabase.from('shopify_metrics').delete().eq('client_id', clientId)

  // Insert new data in batches
  const metrics = generateMetricsData(clientId)
  for (let i = 0; i < metrics.length; i += 50) {
    await supabase.from('client_metrics').insert(metrics.slice(i, i + 50))
  }

  const klaviyo = generateKlaviyoData(clientId)
  for (let i = 0; i < klaviyo.length; i += 50) {
    await supabase.from('klaviyo_metrics').insert(klaviyo.slice(i, i + 50))
  }

  const shopify = generateShopifyData(clientId)
  for (let i = 0; i < shopify.length; i += 50) {
    await supabase.from('shopify_metrics').insert(shopify.slice(i, i + 50))
  }

  revalidatePath('/dashboard')
  revalidatePath('/reports')
  revalidatePath('/admin/clients')
}

export async function updateClientAgency(clientId: string, agencySlug: string) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: clientUser } = await supabase
    .from('client_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (clientUser?.role !== 'admin') throw new Error('Admin access required')

  await supabase
    .from('clients')
    .update({ agency_slug: agencySlug })
    .eq('id', clientId)

  revalidatePath('/admin/clients')
}
