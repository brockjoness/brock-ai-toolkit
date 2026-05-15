import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code)

    if (user) {
      // Check user role and redirect accordingly
      const { data: clientUsers } = await supabase
        .from('client_users')
        .select('role, client_id')
        .eq('user_id', user.id)

      const isAdmin = clientUsers?.some((cu) => cu.role === 'admin') ?? false
      const hasClient = clientUsers?.some((cu) => cu.client_id) ?? false

      if (isAdmin) {
        return NextResponse.redirect(`${origin}/admin`)
      }

      if (hasClient) {
        return NextResponse.redirect(`${origin}/dashboard`)
      }

      // No client_users entry — send to onboarding
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
