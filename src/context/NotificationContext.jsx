import React, { createContext, useState, useCallback, useEffect } from 'react';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(({ title, message, type = 'success', duration = 2500 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newNotification = {
      id,
      title,
      message,
      type,
      duration,
    };

    setNotifications((prev) => {
      // Keep at most 3 simultaneous toasts to prevent screen crowding
      const next = [...prev, newNotification];
      return next.slice(-3);
    });

    if (duration > 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, duration);
    }

    return id;
  }, [dismissNotification]);

  useEffect(() => {
    return () => {
      setNotifications([]);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        dismissNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
