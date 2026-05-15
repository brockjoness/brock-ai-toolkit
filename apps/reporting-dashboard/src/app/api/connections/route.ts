import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const PLATFORM_CLIENT_FIELD: Record<string, string> = {
  meta: 'meta_account_id',
  google: 'google_customer_id',
  klaviyo: 'klaviyo_api_key',
  shopify: 'shopify_store',
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get client_id from client_users
  const { data: clientUser } = await supabase
    .from('client_users')
    .select('client_id')
    .eq('user_id', user.id)
    .single()

  if (!clientUser?.client_id) {
    return NextResponse.json({ error: 'No client associated with user' }, { status: 403 })
  }

  const body = await request.json()
  const { platform, account_identifier } = body

  if (!platform || !account_identifier) {
    return NextResponse.json({ error: 'Platform and account_identifier are required' }, { status: 400 })
  }

  const validPlatforms = ['meta', 'google', 'klaviyo', 'shopify']
  if (!validPlatforms.includes(platform)) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  // Upsert into platform_connections
  const { error: connError } = await supabase
    .from('platform_connections')
    .upsert(
      {
        client_id: clientUser.client_id,
        platform,
        account_identifier,
        status: 'pending',
      },
      { onConflict: 'client_id,platform' }
    )

  if (connError) {
    return NextResponse.json({ error: connError.message }, { status: 500 })
  }

  // Update the corresponding field on the clients table
  const clientField = PLATFORM_CLIENT_FIELD[platform]
  if (clientField) {
    await supabase
      .from('clients')
      .update({ [clientField]: account_identifier })
      .eq('id', clientUser.client_id)
  }

  return NextResponse.json({ success: true })
}
