import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login as apiLogin } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await apiLogin(form.email, form.password)
      if (res.token) {
        login(res.token, { email: form.email })
        navigate('/profile')
      } else {
        setError(res.error || 'فشل الدخول')
      }
    } catch (err) {
      setError('خطأ في الاتصال بالسيرفر')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>تسجيل الدخول</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'جاري الدخول...' : 'دخول'}
        </button>
      </form>
    </div>
  )
}
