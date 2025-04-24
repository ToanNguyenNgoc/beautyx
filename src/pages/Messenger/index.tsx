import { useAuth, useDebounce, useListenerRefresh, useSwrInfinite } from "hooks";
import { ITopic } from "interface";
import { paramsTopic } from "params-query";
import { useContext, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Loader } from "./components"
import style from "./message.module.css"
import icon from "constants/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDateFromNow, onErrorAvatar, unique } from "utils";
import AuthRoute from "route/AuthRoute";
import { EmptyRes } from "components/Layout";
import { AppContext, AppContextType } from "context";
import { MessengerChat } from "./components/Right/MessengerChat";

function Messenger() {
  const { t } = useContext(AppContext) as AppContextType
  const { USER } = useAuth()
  const [query,] = useState(paramsTopic)
  const location = useLocation()
  const { onSetDebounceKeyword } = useDebounce()
  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = (txt: string) => {
    onSetDebounceKeyword({
      text: txt,
      callback: (text) => setKeyword(text)
    })
  }

  const topic_id = location.pathname.split("/")[2]
  const { resData, onLoadMore, totalItem, isValidating, revalidate } = useSwrInfinite({
    API_URL: "topics",
    enable: USER,
    params: Object.assign(query, { s: keyword }),
    dedupingInterval: 0
  })
  const more = () => { if (resData.length < totalItem) { onLoadMore() } };
  useListenerRefresh({
    onListenerMsg: (msg) => {
      revalidate();
    }
  })
  return (
    <div className={style.container}>
      <div className={topic_id ? `${style.left} ${style.left_ch}` : style.left}>
        <div className={style.left_head}>
          <div className={style.left_head_top}>
            <span className={style.left_head_txt}>Chat</span>
            <div className={style.left_head_ctl}></div>
          </div>
          <div className={style.left_head_bot}>
            <img src={icon.searchGray} alt="" />
            <input type="text" placeholder="Tìm kiếm trong tin nhắn..." onChange={e => handleChangeSearch(e.target.value)} />
          </div>
        </div>
        <div className={style.left_body}>
          {(!isValidating && resData.length === 0) && <EmptyRes isRecommend={false} title={t('Search_result.emty_message')} />}
          <InfiniteScroll
            hasMore={true}
            height={`calc(100vh - 172px)`}
            dataLength={resData.length}
            loader={resData.length < totalItem && <Loader />}
            next={more}
          >
            <ul className={style.topic_list}>
              {
                resData.map((item: ITopic) => (
                  <li key={item._id} className={style.topic_cnt}>
                    <Topic item={item} />
                  </li>
                ))
              }
            </ul>
          </InfiniteScroll>
        </div>
      </div>
      <Switch>
        <AuthRoute>
          <Route path="/messages/:_id">
            <div
              style={{ backgroundColor: 'var(--white)' }}
              className={topic_id ? `${style.right} ${style.right_ch}` : style.right}
            >
              <MessengerChat />
            </div>
          </Route>
        </AuthRoute>
      </Switch>
    </div>
  );
}

export default Messenger;

const Topic = ({ item }: { item: ITopic }) => {
  const location = useLocation()
  let name = item.name
  if (item.name?.trim().length === 0 || !item.name) {
    name = unique(item.topic_user?.map(i => i.user?.fullname).filter(Boolean)).join(", ")
  }
  const topic_id = location.pathname.split("/")[2]
  return (
    <Link
      style={item._id === topic_id ? { backgroundColor: 'var(--bg-color)' } : {}}
      to={{ pathname: `/messages/${item._id}`, state: item }}
      className={style.topic}
    >
      <div className={style.topic_left}>
        <div className={style.topic_left_img}>
          <img src={item.organization?.image_url || ''} onError={onErrorAvatar} alt="" />
          <span className={style.topic_left_online}></span>
        </div>
      </div>
      <div className={style.topic_right}>
        <span className={style.topic_name}>
          {item.organization?.name || name}
        </span>
        <div className={style.topic_message}>
          <span>{item.messages[0]?.msg}</span>
          <span>{formatDateFromNow(item.updated_at)}</span>
        </div>
      </div>
    </Link>
  )
}