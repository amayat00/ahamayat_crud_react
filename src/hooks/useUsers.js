import { useCallback, useEffect, useState } from 'react'
import * as api from '../services/api'

// Centraliza el estado de la lista de usuarios y las operaciones CRUD,
// para que las páginas solo consuman datos y callbacks ya resueltos.
export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getUsers()
      setUsers(Array.isArray(data) ? data : data?.users ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const addUser = useCallback(async (payload) => {
    const newUser = await api.createUser(payload)
    setUsers((prev) => [...prev, newUser])
    return newUser
  }, [])

  const editUser = useCallback(async (id, payload) => {
    const updated = await api.updateUser(id, payload)
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
    return updated
  }, [])

  const removeUser = useCallback(async (id) => {
    await api.deleteUser(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  return { users, loading, error, fetchUsers, addUser, editUser, removeUser }
}
