'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PLATFORM_META: Record<string, { label: string; icon: string; helper: string; color: string }> = {
  meta: {
    label: 'Meta Ads',
    icon: '📘',
    helper: 'Enter your Ad Account ID (found in Meta Business Manager)',
    color: '#4285F4',
  },
  google: {
    label: 'Google Ads',
    icon: '🔍',
    helper: 'Enter your Customer ID (format: 123-456-7890)',
    color: '#34A853',
  },
  klaviyo: {
    label: 'Klaviyo',
    icon: '📧',
    helper: 'Enter your Private API Key (Settings → API Keys)',
    color: '#8B5CF6',
  },
  shopify: {
    label: 'Shopify',
    icon: '🛒',
    helper: 'Enter your store URL (your-store.myshopify.com)',
    color: '#96BF48',
  },
}

const STATUS_BADGE: Record<string, { label: string; variant: 'green' | 'yellow' | 'gray' | 'red' }> = {
  connected: { label: 'Connected', variant: 'green' },
  pending: { label: 'Pending', variant: 'yellow' },
  disconnected: { label: 'Disconnected', variant: 'gray' },
  error: { label: 'Error', variant: 'red' },
}

export function PlatformConnectionCard({
  platform,
  status,
  accountIdentifier,
  lastSyncAt,
  clientId,
}: {
  platform: string
  status: string
  accountIdentifier: string | null
  lastSyncAt: string | null
  clientId: string
}) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)
  const [currentAccount, setCurrentAccount] = useState(accountIdentifier)

  const meta = PLATFORM_META[platform] || { label: platform, icon: '🔗', helper: '', color: '#666' }
  const badge = STATUS_BADGE[currentStatus] || STATUS_BADGE.disconnected

  async function handleConnect() {
    if (!inputValue.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          account_identifier: inputValue.trim(),
        }),
      })
      if (res.ok) {
        setCurrentStatus('pending')
        setCurrentAccount(inputValue.trim())
        setInputValue('')
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{meta.icon}</span>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--color-foreground)' }}>
            {meta.label}
          </span>
        </div>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>

      {currentStatus === 'connected' || currentStatus === 'pending' ? (
        <div className="space-y-1.5">
          <p className="text-[12px] text-gray-500">
            Account: <span className="font-mono text-gray-700">{currentAccount}</span>
          </p>
          {lastSyncAt && (
            <p className="text-[12px] text-gray-500">
              Last synced: {new Date(lastSyncAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
          )}
          {currentStatus === 'pending' && (
            <p className="text-[11px] text-yellow-600">Verification in progress...</p>
          )}
        </div>
      ) : currentStatus === 'error' ? (
        <div className="space-y-2">
          <p className="text-[12px] text-red-500">Connection failed. Please re-enter your credentials.</p>
          <div className="flex gap-2">
            <Input
              placeholder={meta.helper}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button size="sm" onClick={handleConnect} disabled={loading || !inputValue.trim()}>
              {loading ? 'Saving...' : 'Retry'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[12px] text-gray-500">{meta.helper}</p>
          <div className="flex gap-2">
            <Input
              placeholder={meta.helper}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button size="sm" onClick={handleConnect} disabled={loading || !inputValue.trim()}>
              {loading ? 'Saving...' : 'Connect'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
