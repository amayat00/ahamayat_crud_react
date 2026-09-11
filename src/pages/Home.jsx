import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <p className="text-sm font-medium text-brand">Taller CRUD · React + Docker</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Gestión de usuarios</h1>
      <p className="mt-4 text-slate">
        Esta aplicación consume la API de usuarios que corre en un contenedor Docker
        (<code className="rounded bg-white px-1.5 py-0.5">http://localhost:8080</code>).
        Desde aquí puedes crear, ver, editar y eliminar usuarios.
      </p>
      <Link
        to="/users"
        className="mt-8 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Ver usuarios
      </Link>
    </div>
  )
}
