import { Link, useNavigate } from 'react-router-dom'
import { clearLoggedIn } from '../auth.js'
import PageHeader from '../components/PageHeader.jsx'

export default function TopPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearLoggedIn()
    navigate('/login')
  }

  return (
    <section>
      <PageHeader title="トップページ" />
      <div className="menu">
        <Link to="/places" className="menu-item">場所一覧画面へ</Link>
        <Link to="/places/new" className="menu-item">場所登録画面へ</Link>
      </div>
      <div className="actions">
        <button type="button" className="link-button" onClick={handleLogout}>ログアウト</button>
      </div>
    </section>
  )
}
