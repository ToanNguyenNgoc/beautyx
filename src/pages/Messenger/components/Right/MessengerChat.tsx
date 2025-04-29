/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useHistory, Link } from "react-router-dom"
import { IMessage, ITopic, ParamsPostMessage } from "interface"
import style from "./right.module.css"
import { XButton, XButtonFile } from "components/Layout"
import icon from "constants/icon"
import { acceptImageVideo, checkMediaType, formatDateFromNow, linkify, onErrorAvatar, unique, uniqueArr } from "utils"
import { useAuth, useElementOnScreen, useGetTopicDetail, usePostMedia, useSwrInfinite } from "hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import { useEffect, useRef, useState, KeyboardEvent, FC, ChangeEvent, memo } from "react"
import { chatApi } from "api"
import { Avatar, CircularProgress, Tooltip } from "@mui/material"
import { DoTypingType, TypingType, useMessengerProvider } from "context"
import { RenderMedia } from "components"

interface MessengerChatProps {
  _id?: string;
  topicProp?: ITopic;
  moreBtn?: boolean
}

export const MessengerChat: FC<MessengerChatProps> = memo(({ _id, topicProp, moreBtn }) => {
  const { USER: user } = useAuth()
  const location = useLocation()
  const history = useHistory()
  const topic_id = _id || location.pathname.split("/")[2]
  const { topic } = useGetTopicDetail(topic_id);
  const botRef = useRef<HTMLDivElement>(null)
  const context = useMessengerProvider();
  const { connect, onListenerMessage, onListenerTyping, doMessage, doTyping } = context;

  const onScrollBottom = () => {
    if (botRef.current) {
      botRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  const users_name = unique(topic?.topic_user?.map(i => i.user?.fullname) ?? [])
  let name = topic?.name || topic?.organization?.name;
  const { resData, onLoadMore, totalItem } = useSwrInfinite({
    API_URL: "messages",
    enable: user && topic_id,
    keyPage: 'p',
    params: {
      l: 25,
      sort: "-created_at",
      topic_id
    },
    dedupingInterval: 0
  })
  const more = () => resData.length < totalItem && onLoadMore()
  const isInScreen = useElementOnScreen({ rootMargin: '100px', threshold: 0.3 }, botRef)
  const [msges, setMsges] = useState<IMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  //[] handle messages
  useEffect(() => {
    let unsubscribeMessage: (() => void) | undefined;
    let unsubscribeTyping: (() => void) | undefined;
    const onListener = async () => {
      await connect();
      unsubscribeMessage = onListenerMessage((msg: IMessage) => {
        if (msg.topic_id === topic_id) {
          setMsges(prev => [msg, ...prev]);
        }
      });
      unsubscribeTyping = onListenerTyping((data: TypingType) => {
        if (data.topic_id === topic_id && data?.user?.id !== user?.id) {
          setIsTyping(data.typing);
        }
      });
    };
    if (context?.isConnected && topic_id) {
      onListener();
    }
    return () => {
      setMsges([]);
      unsubscribeMessage?.();
      unsubscribeTyping?.();
    };
  }, [context?.isConnected, topic_id, user?.id]);

  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.head_left}>
          <XButton
            onClick={() => history.goBack()}
            className={style.head_left_back}
            icon={icon.chevronRightBlack}
          />
          <div className={style.topic}>
            <Avatar src={topic?.organization?.image_url} />
            <div className={style.topic_name}>{name}</div>
          </div>
        </div>
        <div className={style.head_right}>
          {moreBtn && (
            <Tooltip placement="top-end" title="Xem tất cả đoạn chat">
              <div>
                <Link
                  className={style.head_right_btn}
                  to={{ pathname: `/messages/${topic_id}` }}
                >
                  <img src={icon.menuWhite} alt="" />
                </Link>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div id="scrollableDiv" className={style.messages}>
        <div ref={botRef} className={style.bottom}></div>
        <InfiniteScroll
          dataLength={resData.length}
          next={more}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true} //
          hasMore={true}
          loader={resData.length < totalItem && <Loader />}
          scrollableTarget="scrollableDiv"
        >
          {isTyping && <Typing />}
          {uniqueArr(msges)
            .concat(resData)
            .map((item: IMessage, index) => (
              <div key={index} className={style.message}>
                <Message
                  item={item}
                  change={item.user_id === user?.id}
                  topicProp={topicProp}
                  nameUser={name}
                />
              </div>
            ))}
          {
            (msges.length === 0 && resData.length === 0) ?
              <div className={style.message_default}>
                <div className={style.message_info_MC}>
                  <Avatar sx={{ width: 80, height: 80 }} src={topic?.organization?.image_url} />
                  <p className={style.message_info_name}>{name}</p>
                  <XButton>
                    <Link to={{ pathname: `/cua-hang/${topic?.organization?.subdomain || topic?.organization_id}` }}>
                      Xem doanh nghiệp
                    </Link>
                  </XButton>
                </div>
                <div className={style.message_head}>
                  <div className={style.avatar}>
                    <img src={topic?.organization?.image_url} onError={onErrorAvatar} alt="" />
                  </div>
                  <span className={style.user_name}>{name}</span>
                </div>
                <div className={style.message_body}>
                  <div
                    className={style.message_item_cnt}
                    style={{ alignItems: "end" }}
                  >
                    <p
                      style={{
                        backgroundColor: "#f1faff",
                        borderRadius: "8px 0px 8px 8px",
                      }}
                      className={style.message_body_cnt}
                    >
                      Xin chào {users_name && users_name}! {name} có thể hỗ trợ gì cho
                      anh/chị?
                    </p>
                  </div>
                </div>
              </div>
              :
              null
          }
        </InfiniteScroll>
      </div>
      <InputChat
        doMessage={doMessage}
        doTyping={doTyping}
        topic_id={topic_id}
        onScrollBottom={onScrollBottom}
        isInScreen={isInScreen}
        org={topic?.organization}
        moreBtn={moreBtn}
      />
    </div>
  );
})
const Message = ({ item, change = false, topicProp, nameUser }: { item: IMessage, change?: boolean, topicProp?: ITopic, nameUser: string | null | undefined }) => {
  return (
    <div className={style.message_cnt}>
      <div
        className={style.message_head}
        style={change ? { flexDirection: "row-reverse" } : {}}
      >
        {!change && (
          <>
            <div className={style.avatar}>
              <img
                src={item.user?.avatar || ""}
                onError={onErrorAvatar}
                alt=""
              />
            </div>
            <span className={style.user_name}>{item.user?.fullname}</span>
          </>
        )}
        <span className={style.create}>
          {formatDateFromNow(item.created_at)}
        </span>
      </div>
      <div
        style={change ? { flexDirection: "row-reverse" } : {}}
        className={style.message_body}
      >
        <div
          className={style.message_item_cnt}
          style={{ alignItems: change ? "end" : "start" }}
        >
          <div
            style={
              change
                ? {
                  backgroundColor: "#f1faff",
                  borderRadius: "8px 0px 8px 8px",
                }
                : {}
            }
            className={style.message_body_cnt}
            dangerouslySetInnerHTML={{ __html: linkify(item.msg) }}
          />
          {item.media_urls && item.media_urls?.length > 0 && (
            <div
              style={{
                gridTemplateColumns: `repeat(${item.media_urls.length >= 3 ? 3 : item.media_urls.length
                  }, 1fr)`,
                width: `${topicProp ? "18vw" : "33vw"}`,
              }}
              className={style.message_body_images}
            >
              {item.media_urls.map((media_url) => (
                <div key={media_url} className={style.message_body_images_item}>
                  {
                    checkMediaType(media_url) === "IMAGE" ?
                      <img src={media_url} alt="" />
                      :
                      <video controls>
                        <source src={`${media_url}#t=0.1`} />
                      </video>
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
interface InputProps {
  doMessage?: (data: ParamsPostMessage) => void,
  doTyping?: (data: DoTypingType) => void
  topic_id: string;
  onScrollBottom: () => void;
  isInScreen?: boolean;
  org: any
  moreBtn?: boolean
}
const initMsg = {
  _id: "",
  msg: '',
  user_id: 0,
  topic_id: ``,
  reply_id: null,
  updated_at: '',
  created_at: '',
  medias: []
}
const InputChat = ({ doMessage = () => null, doTyping = () => null, topic_id, onScrollBottom, isInScreen, org, moreBtn }: InputProps) => {
  const { handlePostMedia, isLoading: isLoadingMedia } = usePostMedia()
  const [msg, setMsg] = useState<IMessage>(initMsg)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      if (msg.msg.length > 0) {
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }
  };
  useEffect(resizeTextArea, [msg]);
  const onSubmit = async () => {
    if (isLoadingMedia) return;
    if (msg.msg.trim().length > 0 || msg.medias.length > 0) {
      doMessage({
        ...msg,
        topic_id,
        reply_id: undefined,
        media_urls: msg.medias.map(i => i.original_url),
        media_ids: msg.medias.map(i => i.model_id),
        org_id: org?.id
      })
      doTyping({ topic_id, typing: false })
      setMsg(initMsg)
      await chatApi.postMessage({ msg: msg.msg, media_ids: msg.medias.map(i => i.model_id), topic_id })
      textAreaRef.current?.blur()
      onScrollBottom()
    }
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter") {
      event.preventDefault();
      onSubmit()
    }
  }
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => setMsg({ ...msg, medias: [...data, ...msg.medias] })
    })
  }
  const onPaste = (e: any) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith("image") || item.type.startsWith("video")) {
        const files: any = [item.getAsFile()];
        handlePostMedia({
          files,
          callBack: (data) => setMsg({ ...msg, medias: [...data, ...msg.medias] })
        })
      }
    }
  }
  return (
    <div className={style.input_cnt}>
      <XButton
        icon={icon.chevronRightBlack}
        className={!isInScreen ? `${style.scroll_btn} ${style.scroll_btn_act}` : style.scroll_btn}
        onClick={onScrollBottom}
      />
      <div className={style.input_cnt_top}>
        <div className={style.input_cnt_top_img}>
          {
            msg.medias?.map(img => (
              <div key={img.original_url} className={style.input_img_item_cnt}>
                <RenderMedia fileUrl={img.original_url} modelType={img.model_type} />
                {
                  img.model_id > 0 ?
                    <XButton
                      icon={icon.closeCircleWhite} iconSize={20}
                      onClick={() => setMsg({ ...msg, medias: msg.medias.filter(i => i.model_id !== img.model_id) })}
                    />
                    :
                    <div className={style.input_img_item_cnt_load}><CircularProgress size={22} /></div>
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className={style.input_cnt_bot}>
        <div onClick={(e) => e.stopPropagation()} className={style.ip_ctl}>
          <XButton className={style.ip_ctl_btn} iconSize={24} icon={icon.plus} />
          {
            !moreBtn &&
            <XButtonFile
              onChange={onChangeMedia} multiple iconSize={16}
              icon={icon.imageWhite} className={style.ip_ctl_btn}
              accept={acceptImageVideo}
            />
          }
        </div>
        <div className={style.text_area_cnt}>
          <textarea
            ref={textAreaRef}
            onChange={(e) => setMsg({ ...msg, msg: e.target.value })}
            value={msg.msg}
            placeholder="Aa"
            rows={1}
            className={style.text_area}
            onPaste={onPaste}
            onKeyDown={handleKeyDown}
            onFocus={() => doTyping({ topic_id, typing: true })}
            onBlur={() => doTyping({ topic_id, typing: false })}
          />
          <XButton
            className={style.btn_send}
            icon={(msg.msg.length > 0 || msg.medias.length > 0) ? icon.sendWhite : icon.thumbUpWhite}
            iconSize={16}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
export const Loader = () => {
  return <div className={style.load}>Đang tải...<CircularProgress size={14} /></div>
}
const Typing = () => {
  return (
    <div className={style.chatBubble}>
      <div className={style.typing}>
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
      </div>
    </div>
  )
}