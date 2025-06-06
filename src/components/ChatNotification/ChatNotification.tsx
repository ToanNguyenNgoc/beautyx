/* eslint-disable react-hooks/exhaustive-deps */
import { Popup } from "components/Notification";
import { useMessengerProvider } from "context";
import { memo, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const ChatNotification = memo(() => {
  const location = useLocation();
  const history = useHistory();
  const { message, onDeleteMessage, disconnect } = useMessengerProvider();
  useEffect(() => {
    const isExcludedPath = location.pathname.includes('messages') || location.pathname.includes('cua-hang');
    if (!message || isExcludedPath) {
      if (message) onDeleteMessage();
      return;
    }
    Popup.open({
      content: `
        <div>
          <p>${message.user?.fullname || 'Người dùng'}:</p> 
          <p>${message.msg?.length < 120 ? message.msg : message.msg?.slice(0, 120) + '...'}</p>
        </div>
      `,
      onClick: () => {
        history.push(`/messages/${message.topic_id}`);
        onDeleteMessage();
      },
      onClose: () => onDeleteMessage()
    });

    return () => {
      onDeleteMessage();
      disconnect();
    };
  }, [location.pathname, message]);
  return null
})