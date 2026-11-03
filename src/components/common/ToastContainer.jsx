import React from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';

export const ToastContainer = () => {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return createPortal(
    <div
      className="fixed bottom-6 right-6 z-[110] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {notifications.map((n) => {
        const isSuccess = n.type === 'success';
        const isWarning = n.type === 'warning';

        return (
          <div
            key={n.id}
            role="status"
            className="pointer-events-auto bg-[#1E140E] text-[#FAF8F5] border border-[#3E342D] shadow-2xl p-4 flex items-start justify-between gap-3 transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#E2FF32]" />}
                {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
                {!isSuccess && !isWarning && <Info className="w-5 h-5 text-[#E2FF32]" />}
              </div>
              <div className="flex-1 min-w-0">
                {n.title && (
                  <h4 className="font-sans font-bold text-sm text-[#FAF8F5] tracking-wide mb-0.5">
                    {n.title}
                  </h4>
                )}
                {n.message && (
                  <p className="font-sans text-xs text-[#FAF8F5]/80 leading-relaxed break-words">
                    {n.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => dismissNotification(n.id)}
              className="flex-shrink-0 p-1 text-[#FAF8F5]/50 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
};
