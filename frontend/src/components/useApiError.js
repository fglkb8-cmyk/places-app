import { useNavigate } from 'react-router-dom'
import { clearLoggedIn } from '../auth.js'

// APIのエラーを、画面に出すメッセージに直す。
// ・ログインが切れていた(401)ときは、ログイン画面に戻す
// ・サーバーが理由を返したとき(400/404)は、そのメッセージを出す
// ・それ以外（通信エラーなど）は、画面ごとの決まった文言を出す
export function useApiError() {
  const navigate = useNavigate()
  return (err, fallback) => {
    if (err.status === 401) {
      clearLoggedIn()
      navigate('/login', { replace: true })
      return null
    }
    if ((err.status === 400 || err.status === 404) && err.message) return err.message
    return fallback
  }
}
