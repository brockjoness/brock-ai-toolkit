import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendSlackWebhook, formatOnboardingSlackMessage } from '@/lib/slack'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  // Validate required fields
  if (!body.company_name || !body.contact_name || !body.contact_email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Service role client bypasses RLS — needed because a new user doesn't
  // have RLS permissions to insert into clients/client_users/platform_connections
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Strip fields that don't exist in the onboarding_submissions table
  const { agency, account_type, ...submissionData } = body

  // 1. Save the onboarding submission (for admin visibility)
  const { data: submission, error: subError } = await admin
    .from('onboarding_submissions')
    .insert({
      ...submissionData,
      submitted_by: user.id,
      status: 'submitted',
    })
    .select()
    .single()

  if (subError) {
    return NextResponse.json({ error: subError.message }, { status: 500 })
  }

  // 2. Auto-create the client record
  const slug = body.company_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const { data: client, error: clientError } = await admin
    .from('clients')
    .insert({
      name: body.company_name,
      slug,
      agency_slug: 'clickflow',
      meta_account_id: body.meta_account_id || null,
      google_customer_id: body.google_customer_id || null,
      klaviyo_api_key: body.klaviyo_api_key || null,
      shopify_store: body.shopify_store || null,
      monthly_budget: body.monthly_budget ? Number(body.monthly_budget) : null,
      roas_target: body.roas_target ? Number(body.roas_target) : null,
      status: 'active',
      pipeline_stage: 'onboarding',
    })
    .select()
    .single()

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 500 })
  }

  // 3. Link submission to the new client
  await admin
    .from('onboarding_submissions')
    .update({ client_id: client.id, status: 'completed' })
    .eq('id', submission.id)

  // 4. Link user to client — update existing record if one exists (e.g., admin),
  //    otherwise create a new one
  const { data: existingLink } = await admin
    .from('client_users')
    .select('id, role')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (existingLink) {
    await admin
      .from('client_users')
      .update({ client_id: client.id })
      .eq('id', existingLink.id)
  } else {
    await admin.from('client_users').insert({
      user_id: user.id,
      client_id: client.id,
      role: 'client',
    })
  }

  // 5. Create platform connection entries
  const platforms: string[] = body.platforms || []
  for (const platform of platforms) {
    let accountId = null
    if (platform === 'Meta Ads') accountId = body.meta_account_id
    if (platform === 'Google Ads') accountId = body.google_customer_id
    if (platform === 'Klaviyo') accountId = body.klaviyo_api_key
    if (platform === 'Shopify') accountId = body.shopify_store

    await admin.from('platform_connections').insert({
      client_id: client.id,
      platform,
      status: accountId ? 'pending' : 'disconnected',
      account_identifier: accountId,
    })
  }

  // 6. Send Slack notification (non-blocking)
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await sendSlackWebhook(webhookUrl, formatOnboardingSlackMessage(body))
    } catch (e) {
      console.error('Slack webhook failed:', e)
    }
  }

  return NextResponse.json({ success: true, redirect: '/dashboard' })
}
