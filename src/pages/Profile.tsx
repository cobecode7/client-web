import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page">
      <h1>مرحباً بك</h1>
      <p><strong>البريد:</strong> {user?.email}</p>
      <button onClick={handleLogout}>تسجيل خروج</button>
    </div>
  )
}
