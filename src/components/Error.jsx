export default function Error({ error }) {
  return (
    <div style={{ height: 40 }} className="error-message">
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
    </div>
  );
}
