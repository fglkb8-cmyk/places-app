import { Navigate, Route, Routes } from 'react-router-dom'
import { isLoggedIn } from './auth.js'
import LoginPage from './pages/LoginPage.jsx'
import TopPage from './pages/TopPage.jsx'
import PlaceListPage from './pages/PlaceListPage.jsx'
import PlaceDetailPage from './pages/PlaceDetailPage.jsx'
import PlaceFormPage from './pages/PlaceFormPage.jsx'

// ログインしていない場合はログイン画面へ
function RequireAuth({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<RequireAuth><TopPage /></RequireAuth>} />
        <Route path="/places" element={<RequireAuth><PlaceListPage /></RequireAuth>} />
        <Route path="/places/new" element={<RequireAuth><PlaceFormPage mode="new" /></RequireAuth>} />
        <Route path="/places/:placeId" element={<RequireAuth><PlaceDetailPage /></RequireAuth>} />
        <Route path="/places/:placeId/edit" element={<RequireAuth><PlaceFormPage mode="edit" /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </main>
  )
}
