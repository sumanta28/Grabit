// src/Components/NotificationBell.jsx
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const NotificationBell = () => {
  const { notifications, clearNotifications } = useNotification();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative p-2">
        <Bell size={22} strokeWidth={1.8} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown absolute right-0 mt-2 w-64 bg-white border border-slate-200 shadow-lg rounded-md overflow-hidden z-[9999]">
          <div className="p-2 font-semibold border-b border-slate-200 flex justify-between items-center">
            <span>Notifications</span>
            <button
              onClick={clearNotifications}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-3 text-sm text-slate-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-3 text-sm border-b border-slate-100 ${
                    n.type === "success"
                      ? "text-green-600"
                      : n.type === "error"
                      ? "text-red-500"
                      : "text-slate-900"
                  }`}
                >
                  {n.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
