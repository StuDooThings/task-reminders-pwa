
import React from 'react';
import { BellIcon } from './icons';

interface NotificationPermissionProps {
  permission: NotificationPermission;
  requestPermission: () => void;
}

const NotificationPermission: React.FC<NotificationPermissionProps> = ({ permission, requestPermission }) => {
  if (permission === 'granted') {
    return null;
  }

  return (
    <div className="bg-yellow-900 border-l-4 border-yellow-500 text-yellow-100 p-4 rounded-lg shadow-lg mb-8" role="alert">
      <div className="flex">
        <div className="py-1">
            <BellIcon />
        </div>
        <div className="ml-4">
          <p className="font-bold">Enable Notifications</p>
          <p className="text-sm">
            {permission === 'denied' 
              ? 'You have blocked notifications. To get reminders, please enable them in your browser settings.'
              : 'Allow notifications to get reminders when your tasks are due.'
            }
          </p>
          {permission === 'default' && (
            <button
              onClick={requestPermission}
              className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
            >
              Enable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPermission;
