// Servicio central para hablar con la API de usuarios que corre en Docker.
// Cambia BASE_URL si tu contenedor expone la API en otro puerto.
const BASE_URL = 'http://localhost:8080/api'

async function handleResponse(res) {
  let data = null
  try {
    data = await res.json()
  } catch {
    // Algunas respuestas (ej. DELETE) pueden no traer body.
  }

  if (!res.ok) {
    const message = data?.message || data?.error || `Error ${res.status}`
    throw new Error(message)
  }

  return data
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  return handleResponse(res)
}

export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`)
  return handleResponse(res)
}

export async function createUser(payload) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(res)
}

export async function updateUser(id, payload) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(res)
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
