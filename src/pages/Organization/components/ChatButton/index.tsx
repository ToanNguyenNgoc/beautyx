import { FC, useContext, useRef, useState } from "react";
import style from "./chat.module.css"
import { XButton } from "components/Layout";
import Lottie from "lottie-react";
import anmChat from "assets/anmChat.json"
import { MessengerContext, MessengerCtxType, OrgContext, OrgContextType } from "context";
import { chatApi } from "api";
import { IOrganization, ITopic } from "interface";
import { useDeviceMobile } from "hooks";
import { useHistory } from "react-router-dom";
import { MessengerChat } from "pages/Messenger/components/Right/MessengerChat";

export const ChatButton: FC<{ org?: IOrganization, customPosition?: boolean }> = (props) => {
  const { customPosition = true } = props;
  const refBox = useRef<HTMLDivElement>(null)
  const { currTopic } = useContext(MessengerContext) as MessengerCtxType
  const orgContext = useContext(OrgContext) as OrgContextType
  const org  = orgContext?.org || props.org
  const [topic, setTopic] = useState<ITopic>()
  const mb = useDeviceMobile()
  const history = useHistory()
  const onToggleBox = (arg: 'show' | 'hide') => {
    if (refBox.current) {
      if (arg === 'show') refBox.current.classList.add(style.chat_box_show)
      if (arg === 'hide') refBox.current.classList.remove(style.chat_box_show)
    }
  }
  window.addEventListener('click', () => onToggleBox('hide'))
  const onChat = async () => {
    const _topic = currTopic(org.id)
    if (_topic) {
      if (mb) return history.push({ pathname: `/messages/${_topic._id}`, state: _topic })
      setTopic(_topic)
      onToggleBox('show')
    } else {
      const res = await chatApi.createTopic({
        org: org.id,
        group_name: org.name
      })
      return history.push({ pathname: `/messages/${res.context._id}`, state: res.context })
    }
  }
  return (
    <div className={`${customPosition && style.container}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onChat();
        }}
        className={style.box}
      >
        <XButton className={style.chat_btn}>
          <Lottie animationData={anmChat} />
        </XButton>
        <div ref={refBox} className={style.chat_box}>
          {topic && <MessengerChat _id={topic._id} topicProp={topic} moreBtn={!mb} />}
        </div>
      </div>
    </div>
  );
}