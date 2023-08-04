/* eslint-disable react-hooks/exhaustive-deps */
import API_3RD from "api/3rd-api";
import { useContext, useEffect, useRef } from "react";
import { useDeviceMobile, useElementOnScreen } from "hooks";
import { ITrend } from "./trend.interface";
import { Container } from "@mui/system";
import style from "./trends.module.css";
import icon from "constants/icon";
import { useHistory, useParams } from "react-router-dom";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";
import HeadMobile from "features/HeadMobile";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { STALE_TIME } from "config";
import { formatDateFromNow } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadGrid } from "components/LoadingSketion";
import { Dialog } from "@mui/material";
import TrendsDetail from "pages/TrendsDetail";
import { XButton } from "components/Layout";
import { AppContext, AppContextType } from "context";

function Trends() {
  const history = useHistory()
  const { t } = useContext(AppContext) as AppContextType
  const IS_MB = useDeviceMobile()
  const params = useParams()
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['TRENDS'],
    queryFn: ({ pageParam = 1 }) => axios.get(`${API_3RD.API_NODE}/trends`, {
      params: {
        'page': pageParam,
        'limit': '10',
        'include': 'services|tiktok'
      }
    }).then(res => res.data.data),
    staleTime: STALE_TIME,
    getNextPageParam: (page: any) => page?.context?.current_page + 1
  })
  const total = data?.pages[0]?.context.total || 1
  const trends: ITrend[] = data?.pages.map(i => i.context.data).flat() || []
  const onViewMore = () => trends.length < total ? fetchNextPage() : null

  return (
    <>
      {IS_MB && <HeadMobile onBackFunc={() => history.push('/homepage')} title={t('Home.review_beautyx_place')} />}
      <Container>
        <div className={style.container_large}>
          <InfiniteScroll
            dataLength={trends.length}
            hasMore={true}
            loader={<></>}
            next={onViewMore}
          >
            <ul className={style.trend_list}>
              {
                trends.map((item: ITrend, index: number) => (
                  <li key={index} className={style.trend_list_video_thumb}>
                    <VideoItemThumb
                      item={item}
                    />
                  </li>
                ))
              }
            </ul>
            {trends.length < total && <LoadGrid className={style.load_grid} grid={IS_MB ? 1 : 5} item_count={IS_MB ? 1 : 10} />}
          </InfiniteScroll>
        </div>
      </Container>
      <Dialog fullScreen={IS_MB} open={params.id ? true : false} onClose={() => history.goBack()} >
        <div className={style.trend_detail_cnt}>
          <XButton onClick={() => history.goBack()} className={style.trend_detail_btn_close} icon={icon.chevronLeftWhite} iconSize={18} />
          <TrendsDetail />
        </div>
      </Dialog>
    </>
  );
}

export default Trends;

interface VideoItemThumbProps {
  item: ITrend
}

const VideoItemThumb = (props: VideoItemThumbProps) => {
  const { item } = props;
  const history = useHistory()
  const videoRef = useRef<HTMLVideoElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const IS_MB = useDeviceMobile()
  const onDetail = () => history.push(`/xu-huong/${item._id}`)

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisible = useElementOnScreen(options, itemRef);
  const onVideoPress = () => {
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  useEffect(() => {
    if (IS_MB) { onVideoPress() }
    return () => videoRef.current?.pause()
  }, [isVisible])

  const onOrgDetail = () => {
    history.push(formatRouterLinkOrg(item.organization_id))
  }
  const onTriggerPlay = (play: boolean) => {
    if (!IS_MB) {
      if (play) { videoRef.current?.play() }
      if (!play) { videoRef.current?.pause() }
    }
  }
  return (
    <>
      <div
        onMouseEnter={() => onTriggerPlay(true)}
        onMouseLeave={() => onTriggerPlay(false)}
        onClick={!IS_MB ? () => onDetail() : () => { }}
        className={style.video_item_cnt}
      >
        <div ref={itemRef} className={style.trend_item_center} >
        </div>
        <div
          onClick={onOrgDetail}
          className={style.trend_item_head}
        >
          <div className={style.trend_item_head_org}>
            <img src={item.organization_image} alt="" />
          </div>
          <div className={style.trend_item_head_name}>
            <p className={style.org_name}>{item.organization_name}</p>
            <p className={style.create_at}>
              {formatDateFromNow(item.createdAt)}
            </p>
          </div>
        </div>
        <div className={style.trend_item_body}>
          <video
            ref={videoRef}
            className={style.trend_item_video_thumb}
            muted={true}
            // controls={IS_MB}
            webkit-playsinline="webkit-playsinline"
            playsInline={true}
            poster={item.image_thumb}
          >
            <source src={item.media_url} />
          </video>
        </div>
        <div className={style.trend_item_bot}>
          <div onClick={onDetail} className={style.trend_item_bot_ex}>
            <div className={style.item_ex}>
              <img className={style.item_ex_icon} src={icon.heartBoldBlack} alt="" />
              <span className={style.item_ex_text}>{item.tiktok?.digg_count}</span>
            </div>
            <div className={style.item_ex}>
              <img className={style.item_ex_icon} src={icon.commentBoldBlack} alt="" />
              <span className={style.item_ex_text}>{item.tiktok?.comment_count}</span>
            </div>
            <div className={style.item_ex}>
              <img className={style.item_ex_icon} src={icon.shareBoldBlack} alt="" />
              <span className={style.item_ex_text}>{item.tiktok?.share_count}</span>
            </div>
          </div>
          <p className={style.trend_item_desc}>
            {item.content}
          </p>
          <div className={style.trend_item_bot_org}>
            <div className={style.trend_item_bot_org_img}>
              <img src={item.organization_image} alt="" />
            </div>
            <span className={style.trend_item_bot_org_name}>{item.organization_name}</span>
          </div>
        </div>
      </div>
    </>
  )
}