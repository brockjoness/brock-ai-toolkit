import { getClientUser } from '@/lib/queries/auth'
import { fetchPersonas } from '@/lib/queries/personas'
import { PersonaList } from '@/components/personas/persona-list'

export default async function PersonasPage() {
  const { client } = await getClientUser()
  const personas = client ? await fetchPersonas(client.id) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#111110]">Personas</h1>
        <p className="text-[13px] text-[#6B6B60] mt-1">Define customer personas to generate targeted ad copy.</p>
      </div>

      <PersonaList initialPersonas={personas} />
    </div>
  )
}
