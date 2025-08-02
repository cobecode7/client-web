const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

interface LoginResponse {
  token?: string
  message?: string
  error?: string
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  return await res.json()
}

export const register = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  return await res.json()
}
