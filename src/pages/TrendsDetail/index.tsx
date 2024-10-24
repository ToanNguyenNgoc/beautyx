import { useQuery } from "@tanstack/react-query";
import API_3RD from "api/3rd-api";
import axios from "axios";
import { QR_KEY, STALE_TIME } from "config";
import { Link, useParams } from "react-router-dom";
import style from "./trend-detail.module.css"
import { ITrend } from "pages/Trends/trend.interface";
import { useDeviceMobile, useFavorite, useSwr } from "hooks";
import { IOrganization } from "interface";
import API_ROUTE from "api/_api";
import { Avatar } from "@mui/material";
import { formatCountTrends, formatDateFromNow } from "utils";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import Comment from "components/Comment";
import { formatRouterLinkOrg, formatRouterLinkService } from "utils/formatRouterLink/formatRouter";

function TrendsDetail() {
    const mb = useDeviceMobile()
    const { id } = useParams()
    const { data } = useQuery({
        queryKey: [QR_KEY.TREND_DETAIL, id],
        queryFn: () => axios.get(`${API_3RD.API_NODE}/trends/${id}`, { params: { 'include': 'services|tiktok' } })
            .then(res => res.data.data.context),
        enabled: !!id,
        staleTime: STALE_TIME
    })
    const trend: ITrend | undefined = data
    const org: IOrganization = useSwr({
        API_URL: API_ROUTE.ORG(trend?.organization_id || ''),
        enable: !!trend?.organization_id,
        dedupingInterval:0
    }).response
    const { data: dataCommentMix } = useQuery({
        queryKey: [QR_KEY.TREND_DETAIL_CMT, id],
        queryFn: () => axios.get(`${API_3RD.API_NODE}/tiktok/getCommentsByUrl`, { params: { 'filter[trend]': id } })
            .then(res => res.data.data.context.data),
        enabled: !!id,
        staleTime: STALE_TIME
    })
    const { favoriteSt, onToggleFavorite } = useFavorite({
        id: org?.id,
        org_id: org?.id,
        type: 'ORG',
        count: org?.favorites_count,
        favorite: org?.is_favorite
    })


    return (
        trend ?
            <div className={style.container}>
                <div className={style.video_cnt}>
                    <img src={trend?.image_thumb} alt="" className={style.video_thumbnail} />
                    <div className={style.video_box}>
                        <video
                            className={style.video} loop controls
                            webkit-playsinline="webkit-playsinline"
                            playsInline={true}
                        >
                            <source type='video/mp4' src={`${trend?.media_url}#t=0.001`} />
                        </video>
                    </div>
                </div>
                <div className={style.trend_cnt}>
                    <div className={style.trend_cnt_info}>
                        <div className={style.trend_org}>
                            <div className={style.trend_org_avatar}><img src={org?.image_url} alt="" /></div>
                            <div className={style.org_detail}>
                                <Link to={formatRouterLinkOrg(org?.subdomain)} className={style.org_detail_name}>
                                    <span>{org?.name}</span>
                                    <span>{formatDateFromNow(trend.createdAt)}</span>
                                </Link>
                            </div>
                        </div>
                        <div className={style.trend_content}>
                            <h5 className={style.trend_content_title} >{trend.title}</h5>
                            <span className={style.trend_content_desc}>{trend.content}</span>
                        </div>
                        <div className={style.trend_content_services}>
                            {
                                trend.services.map(i => (
                                    <Link className={style.service_item} key={i.id}
                                        to={formatRouterLinkService(i.id, trend.organization_id, i.service_name)}
                                    >
                                        <Avatar src={i.image_url} alt="" /> {i.service_name}
                                    </Link>
                                ))
                            }
                        </div>
                        {/* <div className={style.trend_interactive}>
                            <div className={style.interactive_item}>
                                <XButton icon={icon.eyeBoldBlack} iconSize={16} />{formatCountTrends(trend.tiktok?.play_count)}
                            </div>
                            <div className={style.interactive_item}>
                                <XButton onClick={onToggleFavorite}
                                    icon={favoriteSt.is_favorite ? icon.heartBoldRed : icon.heartBoldBlack} iconSize={16}
                                />
                                {trend.tiktok?.digg_count + favoriteSt.favorite_count}
                            </div>
                            <div className={style.interactive_item}>
                                <XButton icon={icon.commentBoldBlack} iconSize={16} />{trend.tiktok?.comment_count || 0}
                            </div>
                            <div className={style.interactive_item}>
                                <XButton icon={icon.shareBoldBlack} iconSize={16} />{trend.tiktok?.share_count || 1}
                            </div>
                        </div> */}
                    </div>
                    {/* <div className={style.trend_cmt_cnt}>
                        <div className={style.cmt_box}>
                            <Comment
                                commentable_type='ORGANIZATION'
                                commentable_id={org?.id}
                                org_id={org?.id}
                                commentsMixed={dataCommentMix || []}
                                classNameCnt={mb ? '' : style.comment_ctn}
                                classNameInputCnt={mb ? style.comment_input_cnt_mb : style.comment_input_cnt}
                                layout="column"
                            />
                        </div>
                    </div> */}
                </div>
            </div>
            :
            <></>
    );
}

export default TrendsDetail;