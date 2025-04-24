import { Popup } from "components/Notification";
import { useAuth, useListenerSocketGlobal } from "hooks";
import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const ChatNotification: FC = () => {
  const location = useLocation();
  const { USER } = useAuth();
  const history = useHistory();
  useListenerSocketGlobal({
    dependencies: [location.pathname],
    onListenerMsg: (msg) => {
      if (USER?.id !== msg.user_id && !location.pathname?.includes('messages') && !location.pathname?.includes('cua-hang')) {
        console.log(location.pathname);
        Popup.open({
          content: `
            <div>
              <p>${msg.user?.fullname || 'Người dùng'}:</p> 
              <p>${msg.msg?.length < 120 ? msg.msg : msg.msg?.slice(0, 120) + '...'}</p>
            </div>
          `,
          onClick: () => history.push(`/messages/${msg.topic_id}`)
        })
      }
    }
  })
  return null;
}