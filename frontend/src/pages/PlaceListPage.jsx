import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deletePlace, fetchPlaces } from '../api.js'
import PageHeader from '../components/PageHeader.jsx'
import ErrorList from '../components/ErrorList.jsx'
import { useApiError } from '../components/useApiError.js'

export default function PlaceListPage() {
  const navigate = useNavigate()
  const toMessage = useApiError()
  const [places, setPlaces] = useState(null) // null = 読み込み中
  const [errors, setErrors] = useState([])

  const load = useCallback(async () => {
    try {
      setPlaces(await fetchPlaces())
    } catch (err) {
      const message = toMessage(err, '場所の取得に失敗しました。時間をおいて再度お試しください')
      if (message) setErrors([message])
      setPlaces([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (place) => {
    if (!window.confirm('この場所を削除しますか？')) return
    setErrors([])
    try {
      await deletePlace(place.place_id)
      await load()
    } catch (err) {
      const message = toMessage(err, '削除に失敗しました。時間をおいて再度お試しください')
      if (message) setErrors([message])
    }
  }

  return (
    <section>
      <PageHeader title="場所一覧" />
      <div className="toolbar">
        <Link to="/top" className="back-link">トップページへ戻る</Link>
        <button type="button" className="btn primary" onClick={() => navigate('/places/new')}>
          新規登録
        </button>
      </div>
      <ErrorList messages={errors} />
      {places === null && <p className="muted">読み込み中です…</p>}
      {places !== null && places.length === 0 && errors.length === 0 && (
        <p className="empty">登録されている場所はありません</p>
      )}
      {places !== null && places.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>場所名</th>
                <th>エリア</th>
                <th>カテゴリ</th>
                <th className="col-actions">操作</th>
              </tr>
            </thead>
            <tbody>
              {places.map((p) => (
                <tr key={p.place_id}>
                  <td>{p.name}</td>
                  <td>{p.area}</td>
                  <td><span className="chip">{p.category}</span></td>
                  <td className="col-actions">
                    <button type="button" className="btn" onClick={() => navigate(`/places/${p.place_id}`)}>
                      詳細
                    </button>
                    <button type="button" className="btn danger" onClick={() => handleDelete(p)}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
