'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-gray-500">We sent a magic link to {email}</p>
          <button
            onClick={() => setSent(false)}
            className="text-[13px] text-[#2D7A4F] hover:underline cursor-pointer"
          >
            Didn&apos;t receive it? Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}
        className="w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign in</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
            {error}
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D7A4F]"
          required
        />
        {mode === 'password' && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D7A4F]"
            required
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[#1A1A18] text-white rounded-xl hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Signing in...' : mode === 'password' ? 'Sign in' : 'Send magic link'}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setError(null) }}
            className="text-[13px] text-[#888] hover:text-[#1A1A18] cursor-pointer"
          >
            {mode === 'password' ? 'Use magic link instead' : 'Use password instead'}
          </button>
        </div>
      </form>
    </main>
  )
}
