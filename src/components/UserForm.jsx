import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reglas de validación en un solo lugar. `isEditing` hace que la
// contraseña sea opcional (solo se envía si el usuario escribe una nueva).
function validate(values, isEditing) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'El nombre es obligatorio.'
  }

  if (!values.email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Ingresa un correo válido.'
  }

  if (!isEditing && !values.password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (values.password && values.password.length < 6) {
    errors.password = 'Debe tener al menos 6 caracteres.'
  }

  return errors
}

export default function UserForm({ initialValues, onSubmit, submitLabel, isEditing = false }) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? '',
    email: initialValues?.email ?? '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validate(values, isEditing)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    const payload = { name: values.name.trim(), email: values.email.trim() }
    if (values.password) payload.password = values.password

    setSubmitting(true)
    setServerError(null)
    try {
      await onSubmit(payload)
    } catch (err) {
      setServerError(err.message || 'Ocurrió un error al guardar el usuario.')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand/40 ${
      hasError ? 'border-danger' : 'border-slate/25 focus:border-brand'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className={fieldClass(errors.name)}
          placeholder="Juan Pérez"
        />
        {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className={fieldClass(errors.email)}
          placeholder="juan@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          Contraseña {isEditing && <span className="text-slate font-normal">(déjala vacía para no cambiarla)</span>}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          className={fieldClass(errors.password)}
          placeholder="Mínimo 6 caracteres"
        />
        {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
      </div>

      {serverError && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Guardando…' : submitLabel}
      </button>
    </form>
  )
}
