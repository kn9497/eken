import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * AuthPromptModal Component
 * Intercepts unauthenticated attempts to mutate cart or wishlist.
 * Displays prompt:
 * - "Sign in to continue shopping."
 * - "Create an Eken account or log in to save your favourites and manage your shopping cart."
 * Actions:
 * - Log In (opens AccountModal on Sign In tab)
 * - Create Account (opens AccountModal on Sign Up tab)
 * - Cancel / Close (returns to browsing)
 */
export const AuthPromptModal = () => {
  const { isAuthPromptOpen, closeAuthPrompt, openAccountModal } = useAuth();

  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthPromptOpen) {
        closeAuthPrompt();
      }
    };
    if (isAuthPromptOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthPromptOpen, closeAuthPrompt]);

  if (!isAuthPromptOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-prompt-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthPrompt}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E1DFDC] shadow-2xl p-6 sm:p-8 z-10 transition-all animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthPrompt}
          className="absolute top-4 right-4 p-2 text-[#7A706A] hover:text-[#1E140E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E140E]"
          aria-label="Close dialog and return to browsing"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Emblem */}
        <div className="w-12 h-12 bg-[#F2EDE4] border border-[#E1DFDC] flex items-center justify-center mb-6 text-[#1E140E]">
          <Lock className="w-6 h-6 stroke-[1.75]" />
        </div>

        {/* Title */}
        <h2
          id="auth-prompt-title"
          className="font-serif text-2xl sm:text-3xl font-bold text-[#1E140E] mb-3 leading-tight"
        >
          Sign in to continue shopping.
        </h2>

        {/* Supporting text */}
        <p className="font-sans text-sm text-[#4E4540] leading-relaxed mb-8">
          Create an Eken account or log in to save your favourites and manage your shopping cart.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Log In (Primary Action) */}
          <button
            type="button"
            onClick={() => {
              closeAuthPrompt();
              openAccountModal('signin');
            }}
            className="w-full bg-[#E2FF32] text-[#1E140E] font-bold text-xs uppercase tracking-widest py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-[#D4F024] active:bg-[#C8E41E] shadow-sm transition-colors border border-[#D4F024]"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </button>

          {/* Create Account (Secondary Action) */}
          <button
            type="button"
            onClick={() => {
              closeAuthPrompt();
              openAccountModal('signup');
            }}
            className="w-full bg-[#1E140E] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-[#2B231D] active:bg-[#161311] shadow-tactile transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>

          {/* Cancel (Return to browsing) */}
          <button
            type="button"
            onClick={closeAuthPrompt}
            className="w-full bg-transparent text-[#7A706A] hover:text-[#1E140E] font-semibold text-xs uppercase tracking-widest py-3 transition-colors text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
