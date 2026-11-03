import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle } from 'lucide-react';

/**
 * ConfirmationModal Component
 * Accessible confirmation dialog for destructive actions such as item removal from cart
 * or clearing all cart items.
 */
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Remove this product?',
  message = 'Are you sure you want to remove this item from your cart?',
  confirmText = 'Yes, Remove',
  cancelText = 'Cancel',
  isDestructive = true,
}) => {
  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center p-4 sm:p-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E1DFDC] shadow-2xl p-6 sm:p-8 z-10 transition-all animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A706A] hover:text-[#1E140E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
          aria-label="Cancel and close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-12 h-12 bg-rose-50 border border-rose-200 flex items-center justify-center mb-5 text-[#D1405D]">
          <AlertTriangle className="w-6 h-6 stroke-[1.75]" />
        </div>

        {/* Title */}
        <h2
          id="confirm-dialog-title"
          className="font-serif text-2xl font-bold text-[#1E140E] mb-3 leading-tight"
        >
          {title}
        </h2>

        {/* Message */}
        <p
          id="confirm-dialog-desc"
          className="font-sans text-sm text-[#4E4540] leading-relaxed mb-8"
        >
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-widest font-semibold text-[#7A706A] hover:text-[#1E140E] bg-white border border-[#E1DFDC] hover:border-[#1E140E] transition-colors text-center"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-bold text-white transition-colors text-center shadow-tactile ${
              isDestructive
                ? 'bg-[#D1405D] hover:bg-[#B3354E] active:bg-[#962A40]'
                : 'bg-[#1E140E] hover:bg-[#2B231D]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
