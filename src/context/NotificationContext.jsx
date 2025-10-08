// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // 🔔 Show a toast using Sonner
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else toast(message);

    // Remove or comment out the setTimeout block to keep notifications until cleared
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 10000);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
