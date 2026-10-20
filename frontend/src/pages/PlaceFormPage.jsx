import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPlace, fetchPlace, updatePlace } from '../api.js'
import { CATEGORIES, validatePlace } from '../constants.js'
import PageHeader from '../components/PageHeader.jsx'
import ErrorList from '../components/ErrorList.jsx'
import { useApiError } from '../components/useApiError.js'

// 場所登録画面（mode="new"）と場所編集画面（mode="edit"）で共通の入力フォーム
export default function PlaceFormPage({ mode }) {
  const isEdit = mode === 'edit'
  const { placeId } = useParams()
  const navigate = useNavigate()
  const toMessage = useApiError()

  const [form, setForm] = useState({ name: '', area: '', category: '', memo: '' })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(isEdit)
  const [loadFailed, setLoadFailed] = useState(false)
  const [busy, setBusy] = useState(false)

  const backPath = isEdit ? `/places/${placeId}` : '/places'

  // 編集画面：現在の内容を入力欄に表示する
  useEffect(() => {
    if (!isEdit) return undefined
    let active = true
    fetchPlace(placeId)
      .then((data) => {
        if (active) setForm({ name: data.name, area: data.area, category: data.category, memo: data.memo ?? '' })
      })
      .catch((err) => {
        const message = toMessage(err, '場所の取得に失敗しました。時間をおいて再度お試しください')
        if (active && message) {
          setErrors([message])
          setLoadFailed(true)
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
    
  }, [isEdit, placeId])

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validatePlace(form)
    if (found.length > 0) {
      setErrors(found)
      return
    }
    setBusy(true)
    setErrors([])
    const body = {
      name: form.name.trim(),
      area: form.area.trim(),
      category: form.category,
      memo: form.memo.trim() === '' ? null : form.memo,
    }
    try {
      if (isEdit) {
        await updatePlace(placeId, body)
        navigate(`/places/${placeId}`) // 更新後は詳細画面へ
      } else {
        await createPlace(body)
        navigate('/places') // 登録後は一覧画面へ
      }
    } catch (err) {
      const fallback = isEdit
        ? '更新に失敗しました。時間をおいて再度お試しください'
        : '登録に失敗しました。時間をおいて再度お試しください'
      const message = toMessage(err, fallback)
      if (message) setErrors([message])
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="narrow">
      <PageHeader title={isEdit ? '場所編集' : '場所登録'} />
      {loading && <p className="muted">読み込み中です…</p>}
      {!loading && (
        <form onSubmit={handleSubmit} noValidate>
          <ErrorList messages={errors} />
          {!loadFailed && (
            <>
              <label className="field">
                <span>場所名 <b className="required">※</b></span>
                <input type="text" value={form.name} onChange={handleChange('name')} placeholder="例：○○カフェ" />
              </label>
              <label className="field">
                <span>エリア <b className="required">※</b></span>
                <input type="text" value={form.area} onChange={handleChange('area')} placeholder="例：愛媛県松山市" />
              </label>
              <label className="field">
                <span>カテゴリ <b className="required">※</b></span>
                <select value={form.category} onChange={handleChange('category')}>
                  <option value="">選択してください</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>メモ</span>
                <textarea rows="4" value={form.memo} onChange={handleChange('memo')} placeholder="行きたい理由、気になった点など（任意）" />
              </label>
            </>
          )}
          <div className="actions">
            {!loadFailed && (
              <button type="submit" className="btn primary" disabled={busy}>
                {isEdit ? '更新' : '登録'}
              </button>
            )}
            <button type="button" className="btn" onClick={() => navigate(backPath)}>戻る</button>
          </div>
        </form>
      )}
    </section>
  )
}
