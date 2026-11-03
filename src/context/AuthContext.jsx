import React, { createContext, useState, useEffect, useCallback } from 'react';
import { hashPassword, validateEmail, validatePassword } from '../utils/authCrypto';
import { initialOrders, getOrdersByCustomerEmail } from '../data/orders';

export const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'eken_accounts_registry';
const STORAGE_SESSION_KEY = 'eken_auth_session';
const STORAGE_ORDERS_KEY = 'eken_customer_orders';

// Seed default verified patrons (passwords stored only as SHA-256 hashes)
const DEFAULT_SEED_USERS = [
  {
    id: 'user-aditya-sharma',
    fullName: 'Aditya Sharma',
    email: 'aditya@example.com',
    phone: '+91 8728945241',
    passwordHash: 'd977d035fb0853c23b0f4db87121ed1d483de1881cf71e5a6b5dec906b459d41', // Baithak@2026
    role: 'customer',
    verified: true,
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'user-patron-default',
    fullName: 'Aditya Sharma',
    email: 'patron@example.com',
    phone: '+91 8728945241',
    passwordHash: '1e93a18ac5e352ab501b5ce741d7c35d0d78ea99ba5c6b35549299ca11fcbf67', // EkenPatron2026!
    role: 'customer',
    verified: true,
    createdAt: '2026-09-01T00:00:00Z',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal coordination state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountModalTab, setAccountModalTab] = useState('signin');
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [allOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : initialOrders;
      }
    } catch {
      // Fallback to initial orders if parse fails
    }
    return initialOrders;
  });

  // Helper to retrieve current registry of accounts
  const getRegisteredUsers = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Merge default seed accounts so they always exist
          const map = new Map();
          DEFAULT_SEED_USERS.forEach((u) => map.set(u.email.toLowerCase(), u));
          parsed.forEach((u) => map.set(u.email.toLowerCase(), u));
          return Array.from(map.values());
        }
      }
    } catch {
      // Return defaults on error
    }
    return DEFAULT_SEED_USERS;
  }, []);

  // Helper to persist accounts registry
  const saveRegisteredUsers = useCallback((usersList) => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usersList));
    } catch (e) {
      console.error('Failed to save accounts registry:', e);
    }
  }, []);

  // Hydrate session on app load
  useEffect(() => {
    try {
      const sessionData = localStorage.getItem(STORAGE_SESSION_KEY);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session && session.email) {
          const registered = getRegisteredUsers();
          const match = registered.find(
            (u) => u.email.toLowerCase() === session.email.toLowerCase()
          );
          if (match) {
            setUser({
              id: match.id,
              fullName: match.fullName,
              email: match.email,
              phone: match.phone || '',
              role: match.role || 'customer',
              verified: Boolean(match.verified),
            });
          }
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  }, [getRegisteredUsers]);

  // Sign In with email and password
  const signIn = async (email, password, rememberMe = true) => {
    setIsLoading(true);
    setError(null);

    // Realistic small network latency
    await new Promise((res) => setTimeout(res, 350));

    try {
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }
      if (!password) {
        throw new Error('Please enter your password.');
      }

      const inputHash = await hashPassword(password);
      const registered = getRegisteredUsers();
      const match = registered.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      // Constant-time like comparison to avoid user enumeration
      if (!match || match.passwordHash !== inputHash) {
        throw new Error('Invalid email or password. Please try again.');
      }

      const authenticatedUser = {
        id: match.id,
        fullName: match.fullName,
        email: match.email,
        phone: match.phone || '',
        role: match.role || 'customer',
        verified: Boolean(match.verified),
      };

      setUser(authenticatedUser);

      if (rememberMe) {
        localStorage.setItem(
          STORAGE_SESSION_KEY,
          JSON.stringify({
            email: authenticatedUser.email,
            signedInAt: new Date().toISOString(),
          })
        );
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }

      setIsLoading(false);
      return { success: true, user: authenticatedUser };
    } catch (err) {
      setIsLoading(false);
      const msg = err.message || 'Authentication failed. Please try again.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Sign Up / Registration
  const signUp = async (fullName, email, password) => {
    setIsLoading(true);
    setError(null);

    await new Promise((res) => setTimeout(res, 400));

    try {
      if (!fullName || fullName.trim().length < 2) {
        throw new Error('Please provide your full name (minimum 2 characters).');
      }
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }
      const pwCheck = validatePassword(password);
      if (!pwCheck.isValid) {
        throw new Error(pwCheck.message);
      }

      const normalizedEmail = email.trim().toLowerCase();
      const registered = getRegisteredUsers();
      const existing = registered.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (existing) {
        throw new Error('An account with this email address already exists. Please sign in.');
      }

      const passwordHash = await hashPassword(password);
      const newUser = {
        id: `user-${Date.now()}`,
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: '',
        passwordHash,
        role: 'customer', // strictly customer privileges
        verified: true, // auto-verified for client flow
        createdAt: new Date().toISOString(),
      };

      const updatedList = [...registered, newUser];
      saveRegisteredUsers(updatedList);

      const authenticatedUser = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        verified: newUser.verified,
      };

      setUser(authenticatedUser);
      localStorage.setItem(
        STORAGE_SESSION_KEY,
        JSON.stringify({
          email: authenticatedUser.email,
          signedInAt: new Date().toISOString(),
        })
      );

      setIsLoading(false);
      return { success: true, user: authenticatedUser };
    } catch (err) {
      setIsLoading(false);
      const msg = err.message || 'Registration failed. Please check your inputs.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Request password reset link (prevents account enumeration)
  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    setError(null);

    await new Promise((res) => setTimeout(res, 400));

    try {
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      setIsLoading(false);
      return {
        success: true,
        message:
          'If an eligible account matches this email address, password reset instructions have been dispatched.',
      };
    } catch (err) {
      setIsLoading(false);
      const msg = err.message || 'Unable to process reset request.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Reset password implementation
  const resetPassword = async (email, newPassword) => {
    setIsLoading(true);
    setError(null);

    await new Promise((res) => setTimeout(res, 400));

    try {
      const pwCheck = validatePassword(newPassword);
      if (!pwCheck.isValid) {
        throw new Error(pwCheck.message);
      }

      const normalizedEmail = email.trim().toLowerCase();
      const registered = getRegisteredUsers();
      const index = registered.findIndex(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (index === -1) {
        throw new Error('Account record could not be found.');
      }

      const newHash = await hashPassword(newPassword);
      registered[index].passwordHash = newHash;
      saveRegisteredUsers(registered);

      setIsLoading(false);
      return { success: true, message: 'Password updated successfully. You may now sign in.' };
    } catch (err) {
      setIsLoading(false);
      const msg = err.message || 'Password update failed.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  };

  // Retrieve orders strictly belonging to current user
  const getUserOrders = useCallback(() => {
    if (!user || !user.email) return [];
    return getOrdersByCustomerEmail(allOrders, user.email);
  }, [user, allOrders]);

  // Modal coordination callbacks
  const openAccountModal = useCallback((tab = 'signin') => {
    setIsAuthPromptOpen(false);
    setAccountModalTab(tab);
    setIsAccountModalOpen(true);
  }, []);

  const closeAccountModal = useCallback(() => {
    setIsAccountModalOpen(false);
  }, []);

  const openAuthPrompt = useCallback(() => {
    setIsAuthPromptOpen(true);
  }, []);

  const closeAuthPrompt = useCallback(() => {
    setIsAuthPromptOpen(false);
  }, []);

  // Action auth guard: executes callback immediately if authenticated, or opens AuthPromptModal if not
  const requireAuth = useCallback(
    (actionCallback) => {
      if (user) {
        if (typeof actionCallback === 'function') {
          actionCallback();
        }
        return true;
      }
      setIsAuthPromptOpen(true);
      return false;
    },
    [user]
  );

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    clearError: () => setError(null),
    signIn,
    signUp,
    requestPasswordReset,
    resetPassword,
    signOut,
    getUserOrders,
    isAccountModalOpen,
    accountModalTab,
    openAccountModal,
    closeAccountModal,
    isAuthPromptOpen,
    openAuthPrompt,
    closeAuthPrompt,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
