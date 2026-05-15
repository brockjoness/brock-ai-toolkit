export async function sendSlackWebhook(webhookUrl: string, message: { text: string; blocks?: any[] }) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}

export function formatOnboardingSlackMessage(submission: {
  company_name: string
  contact_name: string
  contact_email: string
  website?: string | null
  monthly_budget?: number | null
  platforms?: string[] | null
}) {
  return {
    text: `New onboarding submission from ${submission.company_name}`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🚀 New Onboarding Submission' },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Company:*\n${submission.company_name}` },
          {
            type: 'mrkdwn',
            text: `*Contact:*\n${submission.contact_name} (${submission.contact_email})`,
          },
          {
            type: 'mrkdwn',
            text: `*Website:*\n${submission.website || 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Monthly Budget:*\n${submission.monthly_budget ? `$${submission.monthly_budget.toLocaleString()}` : 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Platforms:*\n${submission.platforms?.join(', ') || 'Not specified'}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View in Dashboard' },
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/onboarding`,
            style: 'primary',
          },
        ],
      },
    ],
  }
}
