import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Package,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/authCrypto';
import { formatPrice } from '../../utils/formatPrice';

/**
 * AccountModal Component
 * Implements customer Sign In, Registration, Password Recovery, and Logged-in Profile
 * faithfully matching Reference Image 1 (Modal Sign In), Reference Image 2 (Customer Profile),
 * and replacing OTP methods with standard email & password credentials.
 */
export const AccountModal = ({ isOpen, onClose, initialTab = 'signin' }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    clearError,
    signIn,
    signUp,
    requestPasswordReset,
    resetPassword,
    signOut,
    getUserOrders,
  } = useAuth();

  // Modal Views: 'auth' (Sign In / Sign Up) | 'forgot' (Send Reset Link) | 'reset' (New Password)
  const [view, setView] = useState('auth');
  const [activeTab, setActiveTab] = useState(initialTab || 'signin'); // 'signin' | 'signup'

  // Update activeTab whenever initialTab changes or modal opens
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirm, setShowSignUpConfirm] = useState(false);
  const [signUpClientError, setSignUpClientError] = useState(null);

  // Password Recovery State
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [resetConfirmationMessage, setResetConfirmationMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Handle ESC key press to close modal
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

  // Reset local state when modal closes
  useEffect(() => {
    if (!isOpen) {
      clearError();
      setSignUpClientError(null);
      setResetSubmitted(false);
      setResetSuccessMessage('');
      setView('auth');
    }
  }, [isOpen, clearError]);

  if (!isOpen) return null;

  // Handle Sign In submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const result = await signIn(signInEmail, signInPassword, rememberMe);
    if (!result.success) {
      // Per specification: Preserve entered email, clear password field
      setSignInPassword('');
    }
  };

  // Handle Sign Up submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpClientError(null);
    clearError();

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpClientError('Passwords do not match. Please verify.');
      return;
    }
    if (signUpPassword.length < 8) {
      setSignUpClientError('Password must be at least 8 characters long.');
      return;
    }

    const result = await signUp(signUpName, signUpEmail, signUpPassword);
    if (result.success) {
      setSignUpPassword('');
      setSignUpConfirmPassword('');
    }
  };

  // Handle Forgot Password submission
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const result = await requestPasswordReset(resetEmail);
    if (result.success) {
      setResetSubmitted(true);
      setResetConfirmationMessage(result.message);
    }
  };

  // Handle Password Reset submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setSignUpClientError(null);

    if (newPassword !== confirmNewPassword) {
      setSignUpClientError('Passwords do not match. Please verify.');
      return;
    }
    if (newPassword.length < 8) {
      setSignUpClientError('Password must be at least 8 characters long.');
      return;
    }

    const result = await resetPassword(resetEmail, newPassword);
    if (result.success) {
      setResetSuccessMessage(result.message);
      setTimeout(() => {
        setView('auth');
        setActiveTab('signin');
        setSignInEmail(resetEmail);
        setResetSubmitted(false);
        setResetSuccessMessage('');
      }, 1500);
    }
  };

  const orders = isAuthenticated ? getUserOrders() : [];

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-headline"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
        {/* Modal Window */}
        <div className="relative inline-block w-full max-w-md bg-white text-left overflow-hidden shadow-2xl transform transition-all border border-gray-200 z-10 my-8">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2
              id="modal-headline"
              className="font-bold uppercase tracking-wider text-xs font-sans text-[#1E140E]"
            >
              {isAuthenticated
                ? 'MY EKEN ACCOUNT'
                : view === 'forgot' || view === 'reset'
                ? 'RESET PASSWORD'
                : 'SIGN IN / REGISTER'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 text-[#1E140E] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* ========================================================= */}
            {/* VIEW A: LOGGED-IN CUSTOMER PROFILE (Reference Image 2)   */}
            {/* ========================================================= */}
            {isAuthenticated && user ? (
              <div className="space-y-6">
                {/* Customer Information Card */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100">
                  <div
                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-base font-sans shrink-0"
                    aria-label={`Initials for ${user.fullName}`}
                  >
                    {getInitials(user.fullName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide text-black font-sans">
                      {user.fullName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {user.email} &bull; {user.verified ? 'Verified Patron' : 'Customer'}
                    </p>
                  </div>
                </div>

                {/* Recent Architectural Orders Section */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#58150E]" /> RECENT ARCHITECTURAL ORDERS
                  </h4>

                  {orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 p-4 space-y-2 bg-white">
                          <div className="flex justify-between items-start text-xs">
                            <div>
                              <p className="font-bold text-black uppercase tracking-wider">
                                Order #{order.id}
                              </p>
                              {order.items && order.items.length > 0 && (
                                <p className="text-gray-500 text-[11px] mt-0.5">
                                  {order.items[0].quantity}x {order.items[0].productName}
                                </p>
                              )}
                            </div>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 font-bold text-[10px] uppercase tracking-wider">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs text-gray-600">
                            <span>Delivery: {order.deliveryCity}</span>
                            <span className="font-bold text-black">
                              {formatPrice(order.totalMinorUnits)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 p-6 text-center space-y-3">
                      <p className="text-xs text-gray-500">No orders yet.</p>
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="inline-block px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-black/80 transition-colors"
                      >
                        Explore Masterworks
                      </Link>
                    </div>
                  )}
                </div>

                {/* Sign Out Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-full py-2.5 border border-gray-300 text-black font-semibold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
                  >
                    SIGN OUT
                  </button>
                </div>
              </div>
            ) : view === 'forgot' ? (
              /* ========================================================= */
              /* VIEW B: FORGOT PASSWORD RECOVERY                          */
              /* ========================================================= */
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => {
                    setView('auth');
                    clearError();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>

                <div>
                  <h3 className="font-bold text-lg text-black mb-1">Forgot your password?</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Enter your registered email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                {resetSubmitted ? (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-green-50 border border-green-200 text-xs text-green-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{resetConfirmationMessage}</span>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-2">
                      <p className="font-semibold text-black">Reset Link Simulator:</p>
                      <p>
                        For verification convenience, you can simulate clicking your email reset link below:
                      </p>
                      <button
                        type="button"
                        onClick={() => setView('reset')}
                        className="text-xs font-bold text-black underline hover:text-[#58150E]"
                      >
                        Open Password Reset Form &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="forgot-email"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        EMAIL ADDRESS
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="forgot-email"
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="patron@example.com"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-[#E2FF32] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#D4F024] transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      SEND RESET LINK
                    </button>
                  </form>
                )}
              </div>
            ) : view === 'reset' ? (
              /* ========================================================= */
              /* VIEW C: ENTER NEW PASSWORD (RESET COMPLETION)             */
              /* ========================================================= */
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">Set New Password</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Choose a strong password with at least 8 characters.
                  </p>
                </div>

                {resetSuccessMessage ? (
                  <div className="p-4 bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{resetSuccessMessage}</span>
                  </div>
                ) : (
                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    {signUpClientError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{signUpClientError}</span>
                      </div>
                    )}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        NEW PASSWORD
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter at least 8 characters"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="text-gray-400 hover:text-black ml-1 p-0.5"
                          aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-new-password"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        CONFIRM NEW PASSWORD
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="confirm-new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-[#E2FF32] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#D4F024] transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      UPDATE PASSWORD
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* ========================================================= */
              /* VIEW D: AUTHENTICATION TABS (Reference Image 1)           */
              /* ========================================================= */
              <div>
                {/* Welcome Heading & Description */}
                <div className="mb-6">
                  <h3 className="font-bold text-xl sm:text-2xl text-black mb-1.5 font-sans">
                    Welcome to EKEN
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                    Access your account to track orders, save favorites, and manage your profile.
                  </p>
                </div>

                {/* Authentication Tabs with Active Indicator */}
                <div className="flex items-center border-b border-gray-200 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      clearError();
                      setSignUpClientError(null);
                    }}
                    className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                      activeTab === 'signin'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-black'
                    }`}
                  >
                    <Mail className="w-4 h-4" /> Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signup');
                      clearError();
                      setSignUpClientError(null);
                    }}
                    className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                      activeTab === 'signup'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-black'
                    }`}
                  >
                    <User className="w-4 h-4" /> Sign Up
                  </button>
                </div>

                {/* TAB 1: SIGN IN FORM */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    {/* Error Notice */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="signin-email"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        EMAIL ADDRESS
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signin-email"
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="patron@example.com"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="signin-password"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        PASSWORD
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signin-password"
                          type={showSignInPassword ? 'text' : 'password'}
                          required
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="text-gray-400 hover:text-black ml-1 p-0.5"
                          aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignInPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password Row */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-700 select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setView('forgot');
                          setResetEmail(signInEmail);
                          clearError();
                        }}
                        className="font-bold text-black hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Sign In Button (Reference Image 1) */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-[#E2FF32] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#D4F024] transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                    </button>

                    {/* Sign Up Navigation */}
                    <p className="text-xs text-gray-500 text-center mt-5">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('signup');
                          clearError();
                          setSignUpClientError(null);
                        }}
                        className="font-bold text-black underline hover:text-[#58150E]"
                      >
                        Sign Up
                      </button>
                    </p>
                  </form>
                )}

                {/* TAB 2: SIGN UP FORM */}
                {activeTab === 'signup' && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-4">
                    {/* Error Notices */}
                    {(signUpClientError || error) && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{signUpClientError || error}</span>
                      </div>
                    )}

                    {/* Full Name Field */}
                    <div>
                      <label
                        htmlFor="signup-name"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        FULL NAME
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <User className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signup-name"
                          type="text"
                          required
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="signup-email"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        EMAIL ADDRESS
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signup-email"
                          type="email"
                          required
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="patron@example.com"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="signup-password"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        PASSWORD
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signup-password"
                          type={showSignUpPassword ? 'text' : 'password'}
                          required
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="Create a password (min 8 chars)"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="text-gray-400 hover:text-black ml-1 p-0.5"
                          aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignUpPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label
                        htmlFor="signup-confirm-password"
                        className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5"
                      >
                        CONFIRM PASSWORD
                      </label>
                      <div className="flex items-center border border-gray-300 px-3 py-2.5 focus-within:border-black transition-colors">
                        <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                          id="signup-confirm-password"
                          type={showSignUpConfirm ? 'text' : 'password'}
                          required
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          className="w-full text-xs text-black placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpConfirm(!showSignUpConfirm)}
                          className="text-gray-400 hover:text-black ml-1 p-0.5"
                          aria-label={showSignUpConfirm ? 'Hide password' : 'Show password'}
                        >
                          {showSignUpConfirm ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms and Privacy Statement */}
                    <p className="text-[11px] text-gray-500 leading-normal">
                      By creating an account, you agree to EKEN's Terms of Service and Privacy Policy.
                    </p>

                    {/* Create Account Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-[#E2FF32] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#D4F024] transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>

                    {/* Sign In Navigation */}
                    <p className="text-xs text-gray-500 text-center mt-5">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('signin');
                          clearError();
                          setSignUpClientError(null);
                        }}
                        className="font-bold text-black underline hover:text-[#58150E]"
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
