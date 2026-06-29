"use client";

import { FaTriangleExclamation, FaXmark } from "react-icons/fa6";

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
    <dialog className="modal modal-open">
      <div className="modal-box rounded-3xl border-0 shadow-2xl p-0 max-w-md overflow-hidden bg-base-100">
        {/* Top Accent Line */}
        <div
          className={`h-1 w-full ${confirmClass.includes("error") ? "bg-error" : confirmClass.includes("warning") ? "bg-warning" : "bg-primary"}`}
        />

        <div className="p-8 text-center">
          {/* Icon */}
          <div
            className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
              confirmClass.includes("error")
                ? "bg-error/10"
                : confirmClass.includes("warning")
                  ? "bg-warning/10"
                  : "bg-primary/10"
            }`}
          >
            <FaTriangleExclamation
              className={`text-3xl ${
                confirmClass.includes("error")
                  ? "text-error"
                  : confirmClass.includes("warning")
                    ? "text-warning"
                    : "text-primary"
              }`}
            />
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>

          <p className="text-sm opacity-60 font-light leading-7 mt-3 max-w-xs mx-auto">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={onClose}
              className="btn btn-ghost flex-1 rounded-xl hover:bg-base-200 transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className={`btn flex-1 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 ${confirmClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <form
        method="dialog"
        className="modal-backdrop bg-black/40 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle bg-base-100/10 border-0 text-white hover:bg-base-100/20 transition-colors duration-200"
        >
          <FaXmark className="text-lg" />
        </button>
      </form>
    </dialog>
  );
}
