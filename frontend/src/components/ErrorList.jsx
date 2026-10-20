export default function ErrorList({ messages }) {
  if (!messages || messages.length === 0) return null
  return (
    <ul className="error-list" role="alert">
      {messages.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  )
}
