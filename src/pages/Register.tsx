import { useState } from 'react'
import { register as apiRegister } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await apiRegister(form.email, form.password)
      if (res.message) {
        alert('تم التسجيل بنجاح! يمكنك الآن الدخول.')
        navigate('/login')
      } else {
        setError(res.error || 'فشل التسجيل')
      }
    } catch (err) {
      setError('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>إنشاء حساب</h1>
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
          {loading ? 'جاري التسجيل...' : 'تسجيل'}
        </button>
      </form>
    </div>
  )
}
