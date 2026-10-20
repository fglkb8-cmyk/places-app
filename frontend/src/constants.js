export const CATEGORIES = ['カフェ', 'グルメ', '観光地', '温泉', 'その他']

// 登録・更新の入力チェック（画面設計書の入力制限と同じ）
export function validatePlace({ name, area, category, memo }) {
  const errors = []
  if (!name.trim()) errors.push('場所名を入力してください')
  else if (name.trim().length > 50) errors.push('場所名は50文字以内で入力してください')
  if (!area.trim()) errors.push('エリアを入力してください')
  else if (area.trim().length > 50) errors.push('エリアは50文字以内で入力してください')
  if (!category) errors.push('カテゴリを選択してください')
  if (memo.length > 200) errors.push('メモは200文字以内で入力してください')
  return errors
}
