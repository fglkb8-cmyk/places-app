// バックエンド（Spring Boot）のAPIを呼び出す
const API_BASE = "http://localhost:8080"

export class ApiError extends Error {
  constructor(message, status) {
    super(message ?? '')
    this.status = status
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: 'include', // ログイン状態（Cookie）を送る
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(null, 0) // サーバーにつながらない
  }
  let data = null
  try {
    data = await res.json()
  } catch {
    // 本文なし
  }
  if (!res.ok) throw new ApiError(data?.message ?? null, res.status)
  return data
}

// POST /login
export const login = (login_id, password) =>
  request('/login', { method: 'POST', body: { login_id, password } })

// GET /places
export const fetchPlaces = () => request('/places')

// GET /places/{place_id}
export const fetchPlace = (id) => request(`/places/${id}`)

// POST /places
export const createPlace = (place) => request('/places', { method: 'POST', body: place })

// PUT /places/{place_id}
export const updatePlace = (id, place) =>
  request(`/places/${id}`, { method: 'PUT', body: place })

// DELETE /places/{place_id}
export const deletePlace = (id) => request(`/places/${id}`, { method: 'DELETE' })
