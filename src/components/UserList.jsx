import { Link } from 'react-router-dom'

export default function UserList({ users, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate/30 bg-white/60 px-6 py-12 text-center text-slate">
        Aún no hay usuarios registrados. Crea el primero desde el botón de arriba.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate/15 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-slate">
          <tr>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Correo</th>
            <th className="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate/10">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-mist/60">
              <td className="px-4 py-3 font-medium text-ink">{user.name}</td>
              <td className="px-4 py-3 text-slate">{user.email}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="rounded-md border border-slate/25 px-3 py-1.5 text-xs font-medium text-ink transition hover:border-brand hover:text-brand"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(user)}
                    className="rounded-md border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger transition hover:bg-danger/10"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
