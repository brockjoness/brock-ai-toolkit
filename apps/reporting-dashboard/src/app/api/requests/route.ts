import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendSlackWebhook } from '@/lib/slack'
import { NextResponse } from 'next/server'

const TYPE_LABELS: Record<string, string> = {
  creative_brief: 'Creative Brief',
  strategy_change: 'Strategy Change',
  budget_change: 'Budget Change',
  question: 'Question',
  other: 'Other',
}

function formatRequestSlackMessage(request: {
  type: string
  title: string
  description?: string | null
  priority: string
  clientName: string
}) {
  return {
    text: `New client request from ${request.clientName}: ${request.title}`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'New Client Request' },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Client:*\n${request.clientName}` },
          { type: 'mrkdwn', text: `*Type:*\n${TYPE_LABELS[request.type] || request.type}` },
          { type: 'mrkdwn', text: `*Priority:*\n${request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}` },
          { type: 'mrkdwn', text: `*Title:*\n${request.title}` },
        ],
      },
      ...(request.description
        ? [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Description:*\n${request.description}`,
              },
            },
          ]
        : []),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View Requests' },
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/requests`,
            style: 'primary',
          },
        ],
      },
    ],
  }
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

  // Validate required fields
  if (!body.type || !body.title) {
    return NextResponse.json({ error: 'Type and title are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('client_requests')
    .insert({
      client_id: clientUser.client_id,
      submitted_by: user.id,
      type: body.type,
      title: body.title,
      description: body.description || null,
      priority: body.priority || 'normal',
      status: 'open',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get client name for Slack message
  const { data: client } = await supabase
    .from('clients')
    .select('name')
    .eq('id', clientUser.client_id)
    .single()

  // Send Slack notification
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await sendSlackWebhook(
        webhookUrl,
        formatRequestSlackMessage({
          type: body.type,
          title: body.title,
          description: body.description,
          priority: body.priority || 'normal',
          clientName: client?.name || 'Unknown',
        })
      )
    } catch (e) {
      console.error('Slack webhook failed:', e)
    }
  }

  return NextResponse.json({ success: true, request: data })
}
