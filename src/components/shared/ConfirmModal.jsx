"use client";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  confirmClass = "btn-primary",
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="py-4">{message}</p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>

          <button className={`btn ${confirmClass}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
