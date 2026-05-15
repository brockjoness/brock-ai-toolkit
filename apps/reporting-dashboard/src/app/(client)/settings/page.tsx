import { getClientUser } from '@/lib/queries/auth'
import { fetchPlatformConnections } from '@/lib/queries/connections'
import { Card } from '@/components/ui/card'
import { PlatformConnectionCard } from '@/components/dashboard/platform-connection-card'

const ALL_PLATFORMS = ['meta', 'google', 'klaviyo', 'shopify']

export default async function SettingsPage() {
  const { user, client } = await getClientUser()

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 text-lg">No client data available. Complete onboarding to get started.</p>
      </div>
    )
  }

  const connections = await fetchPlatformConnections(client.id)
  const connectionMap = new Map(connections.map((c) => [c.platform, c]))

  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Settings
        </h1>
        <p className="text-sm text-gray-500">Manage your account and platform connections.</p>
      </div>

      {/* Account section */}
      <Card className="mb-6">
        <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
          Account
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Email</p>
            <p className="text-[13px] font-medium" style={{ color: 'var(--color-foreground)' }}>{user.email}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Client</p>
            <p className="text-[13px] font-medium" style={{ color: 'var(--color-foreground)' }}>{client.name}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Agency</p>
            <p className="text-[13px] font-medium" style={{ color: 'var(--color-foreground)' }}>
              {client.agency_slug?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'N/A'}
            </p>
          </div>
        </div>
      </Card>

      {/* Connected Platforms */}
      <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
        Connected Platforms
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {ALL_PLATFORMS.map((platform) => {
          const conn = connectionMap.get(platform)
          return (
            <PlatformConnectionCard
              key={platform}
              platform={platform}
              status={conn?.status || 'disconnected'}
              accountIdentifier={conn?.account_identifier || null}
              lastSyncAt={conn?.last_sync_at || null}
              clientId={client.id}
            />
          )
        })}
      </div>
    </div>
  )
}
