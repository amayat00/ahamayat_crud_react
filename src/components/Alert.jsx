const styles = {
  success: 'border-brand/30 bg-brand/10 text-brand-dark',
  error: 'border-danger/30 bg-danger/10 text-danger',
  info: 'border-slate/30 bg-slate/10 text-slate',
}

export default function Alert({ type = 'info', children, onClose }) {
  if (!children) return null

  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      <span>{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="text-current/70 hover:text-current"
        >
          ✕
        </button>
      )}
    </div>
  )
}
