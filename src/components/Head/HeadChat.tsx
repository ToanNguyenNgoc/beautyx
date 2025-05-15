import { memo } from "react";
import style from './head.module.css'
import { clst } from "utils";
import icon from "constants/icon";
import { Link } from "react-router-dom";
import { useDeviceMobile, useGetAllTopicIds } from "hooks";
import { useMessengerProvider } from "context";

export const HeadChat = memo(({ changeStyle }: { changeStyle?: boolean }) => {
  const { topic_ids } = useGetAllTopicIds();
  const { isConnected } = useMessengerProvider();
  const isMobile = useDeviceMobile();
  if (isMobile || !isConnected) return null;
  return (
    <Link
      to={'/messages' + (topic_ids.length > 0 ? `/${topic_ids[0]}` : '')}
      className={
        changeStyle
          ? clst([
            style.head_top_right_btn,
            style.head_top_right_btn_ch,
          ])
          : style.head_top_right_btn
      }
    >
      <img
        src={changeStyle ? icon.chatPurple : icon.chatPurple}
        alt=""
      />
    </Link>
  )
})