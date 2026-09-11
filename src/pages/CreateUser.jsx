import { useNavigate, Link } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { createUser } from '../services/api'

export default function CreateUser() {
  const navigate = useNavigate()

  async function handleCreate(payload) {
    const user = await createUser(payload)
    navigate('/users', {
      state: { feedback: { type: 'success', text: `Usuario "${user.name}" creado correctamente.` } },
    })
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <Link to="/users" className="text-sm text-brand hover:underline">
        ← Volver a usuarios
      </Link>
      <h1 className="mt-3 font-display text-2xl text-ink">Nuevo usuario</h1>
      <div className="mt-6 rounded-xl border border-slate/15 bg-white p-6 shadow-sm">
        <UserForm onSubmit={handleCreate} submitLabel="Crear usuario" />
      </div>
    </div>
  )
}
