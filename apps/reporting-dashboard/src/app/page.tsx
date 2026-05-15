import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          clickflow<span className="text-[#2D7A4F]">.dashboard</span>
        </h1>
        <p className="text-lg text-gray-500">Client performance dashboard</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-[#1A1A18] text-white rounded-xl hover:bg-[#333] transition-colors"
        >
          Sign in
        </Link>
      </div>
    </main>
  )
}
