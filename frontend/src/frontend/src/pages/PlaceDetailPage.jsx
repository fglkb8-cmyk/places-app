import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPlace } from '../api.js'
import PageHeader from '../components/PageHeader.jsx'
import ErrorList from '../components/ErrorList.jsx'
import { useApiError } from '../components/useApiError.js'

export default function PlaceDetailPage() {
  const { placeId } = useParams()
  const navigate = useNavigate()
  const toMessage = useApiError()
  const [place, setPlace] = useState(null)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchPlace(placeId)
      .then((data) => active && setPlace(data))
      .catch((err) => {
        const message = toMessage(err, '場所の取得に失敗しました。時間をおいて再度お試しください')
        if (active && message) setErrors([message])
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId])

  return (
    <section className="narrow">
      <PageHeader title="場所詳細" />
      <ErrorList messages={errors} />
      {loading && <p className="muted">読み込み中です…</p>}
      {place && (
        <dl className="detail">
          <dt>場所名</dt>
          <dd>{place.name}</dd>
          <dt>エリア</dt>
          <dd>{place.area}</dd>
          <dt>カテゴリ</dt>
          <dd><span className="chip">{place.category}</span></dd>
          <dt>メモ</dt>
          <dd className="memo">{place.memo}</dd>
        </dl>
      )}
      <div className="actions">
        {place && (
          <button type="button" className="btn primary" onClick={() => navigate(`/places/${placeId}/edit`)}>
            編集
          </button>
        )}
        <button type="button" className="btn" onClick={() => navigate('/places')}>一覧へ戻る</button>
      </div>
    </section>
  )
}
