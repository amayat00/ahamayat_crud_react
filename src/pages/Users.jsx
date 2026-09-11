import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import UserList from '../components/UserList'
import Alert from '../components/Alert'

export default function Users() {
  const { users, loading, error, removeUser } = useUsers()
  const [pendingDelete, setPendingDelete] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Si venimos de crear/editar un usuario, mostramos el mensaje de éxito
  // que llega en el estado de navegación y luego lo limpiamos.
  useEffect(() => {
    if (location.state?.feedback) {
      setFeedback(location.state.feedback)
      navigate(location.pathname, { replace: true, state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  async function confirmDelete() {
    try {
      await removeUser(pendingDelete.id)
      setFeedback({ type: 'success', text: `Usuario "${pendingDelete.name}" eliminado.` })
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'No se pudo eliminar el usuario.' })
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Usuarios</h1>
        <Link
          to="/users/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          + Nuevo usuario
        </Link>
      </div>

      {feedback && (
        <div className="mb-4">
          <Alert type={feedback.type} onClose={() => setFeedback(null)}>
            {feedback.text}
          </Alert>
        </div>
      )}

      {error && (
        <div className="mb-4">
          <Alert type="error">No se pudo cargar la lista de usuarios: {error}</Alert>
        </div>
      )}

      {loading ? (
        <p className="text-slate">Cargando usuarios…</p>
      ) : (
        <UserList users={users} onDelete={setPendingDelete} />
      )}

      {pendingDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-ink/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-ink">¿Eliminar usuario?</h2>
            <p className="mt-2 text-sm text-slate">
              Esta acción eliminará a <span className="font-medium text-ink">{pendingDelete.name}</span> de forma
              permanente.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="rounded-md border border-slate/25 px-4 py-2 text-sm font-medium text-ink"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-danger px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
