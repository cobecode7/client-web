import { useState } from 'react'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (data: { email: string; password: string }) => void
  loading: boolean
}

export default function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{type === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</h2>

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
        {loading ? 'جاري المعالجة...' : type === 'login' ? 'دخول' : 'تسجيل'}
      </button>
    </form>
  )
}
