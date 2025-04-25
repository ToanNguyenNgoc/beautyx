/* eslint-disable react-hooks/exhaustive-deps */
import { Popup } from "components/Notification";
import { useGetMessageChatGlobal } from "hooks";
import { memo, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const ChatNotification = memo(() => {
  const location = useLocation();
  const history = useHistory();
  const { message, setMessage, disconnect } = useGetMessageChatGlobal();
  useEffect(() => {
    const isExcludedPath = location.pathname.includes('messages') || location.pathname.includes('cua-hang');

    if (!message || isExcludedPath) {
      if (message) setMessage(undefined);
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
        setMessage(undefined);
      },
      onClose: () => setMessage(undefined)
    });

    return () => {
      setMessage(undefined);
      disconnect();
    };
  }, [location.pathname, message]);
  return null
})