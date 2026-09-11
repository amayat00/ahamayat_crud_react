import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import UserForm from '../components/UserForm'
import Alert from '../components/Alert'
import { getUser, updateUser } from '../services/api'

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    getUser(id)
      .then((data) => {
        if (active) setUser(data)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  async function handleUpdate(payload) {
    const updated = await updateUser(id, payload)
    navigate('/users', {
      state: { feedback: { type: 'success', text: `Usuario "${updated.name}" actualizado.` } },
    })
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <Link to="/users" className="text-sm text-brand hover:underline">
        ← Volver a usuarios
      </Link>
      <h1 className="mt-3 font-display text-2xl text-ink">Editar usuario</h1>

      <div className="mt-6">
        {loading && <p className="text-slate">Cargando usuario…</p>}
        {error && <Alert type="error">No se pudo cargar el usuario: {error}</Alert>}
        {!loading && !error && user && (
          <div className="rounded-xl border border-slate/15 bg-white p-6 shadow-sm">
            <UserForm initialValues={user} onSubmit={handleUpdate} submitLabel="Guardar cambios" isEditing />
          </div>
        )}
      </div>
    </div>
  )
}
