import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/forms/onboarding-form'

export default async function OnboardingPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Check if user already has a client
  const { data: clientUsers } = await supabase
    .from('client_users')
    .select('client_id')
    .eq('user_id', user.id)

  const hasClient = clientUsers?.some((cu) => cu.client_id) ?? false
  if (hasClient) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Gradient header — matches clickflow.dev hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -inset-x-20 -top-20">
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-100"
            style={{
              background: 'rgba(66, 133, 244, 0.18)',
              filter: 'blur(70px)',
              top: '-80px',
              left: '10%',
              animation: 'gradientDrift 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[350px] h-[350px] rounded-full opacity-100"
            style={{
              background: 'rgba(251, 188, 5, 0.14)',
              filter: 'blur(70px)',
              top: '-40px',
              right: '15%',
              animation: 'gradientDrift2 25s ease-in-out infinite',
            }}
          />
        </div>
        <div className="relative max-w-2xl mx-auto pt-16 pb-8 px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1A1A18]">Welcome to Clickflow</h1>
          <p className="text-gray-500 mt-2">
            Let&apos;s get your account set up. This takes about 5 minutes.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pb-12 px-4">
        <OnboardingForm userEmail={user.email || ''} />
      </div>

      <style>{`
        @keyframes gradientDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes gradientDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.08); }
          66% { transform: translate(15px, -15px) scale(0.92); }
        }
      `}</style>
    </div>
  )
}
