import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api.js'
import { setLoggedIn } from '../auth.js'
import PageHeader from '../components/PageHeader.jsx'
import ErrorList from '../components/ErrorList.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = []
    if (!loginId.trim()) found.push('ログインIDを入力してください')
    if (!password) found.push('パスワードを入力してください')
    if (found.length > 0) {
      setErrors(found)
      return
    }
    setBusy(true)
    setErrors([])
    try {
      await login(loginId.trim(), password)
      setLoggedIn()
      navigate('/top')
    } catch (err) {
      if (err.status === 400 || err.status === 401) {
        setErrors([err.message || 'ログインIDまたはパスワードが正しくありません'])
      } else {
        setErrors(['処理に失敗しました。時間をおいて再度お試しください'])
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="narrow">
      <PageHeader title="ログイン" />
      <form onSubmit={handleSubmit} noValidate>
        <ErrorList messages={errors} />
        <label className="field">
          <span>ログインID</span>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>
        <label className="field">
          <span>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <div className="actions">
          <button type="submit" className="btn primary" disabled={busy}>ログイン</button>
        </div>
      </form>
    </section>
  )
}
