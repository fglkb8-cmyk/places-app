export default function PageHeader({ title }) {
  return (
    <header className="page-header">
      <p className="app-name">行きたい場所リスト</p>
      <h1>{title}</h1>
    </header>
  )
}
