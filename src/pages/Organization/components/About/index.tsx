import { Container, Dialog } from "@mui/material";
import style from "./about.module.css";
import { useContext, useState, useRef, FC, useEffect } from "react";
import { OrgContext, OrgContextType } from "context";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import icon from "constants/icon";
import { OrgItemMap } from "components/Layout/OrgItemMap";
import Comment from "components/Comment";
import { ITrend } from "pages/Trends/trend.interface";
import Slider from "react-slick";
import { useElementOnScreen } from "hooks/useElementOnScreen";
import formatPrice from "utils/formatPrice";
import { formatRouterLinkService } from "utils/formatRouterLink/formatRouter";
import { Link, useHistory } from "react-router-dom";
import { IOrganization } from "interface";
import Drawer from "@mui/material/Drawer";
import useDeviceMobile from "hooks/useDeviceMobile";
import styleTrends from "./aboutComment.module.css";
import { formatDateFromNow, onErrorImg, formatCountTrends } from "utils";
import {
  // postMediaMulti,
  useComment,
  useFavorite,
  useFetchInfinite,
} from "hooks";
import { ParamComment } from "params-query/param.interface";
import { paramsComment } from "params-query";
import API_3RD from "api/3rd-api";
import Skeleton from "react-loading-skeleton";
import {
  ITrendComment,
  ITrendCommentChild,
} from "pages/TrendsDetail/interface";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { Input, XButton, XButtonFile } from "components/Layout";

export const About = () => {
  const { org, trends } = useContext(OrgContext) as OrgContextType;
  const [map, setMap] = useState(false);
  const commentsMixed = trends
    .map(i => i.comments ? i.comments?.map(item => { return { ...item, created_at: i.createdAt } }) : [])
    .filter(Boolean)
    .flat()
  return (
    <Container>
      {trends.length !== 0 && (
        <div className={style.container}>
          <div className={style.section}>
            <PreviewMedia />
          </div>
        </div>
      )}

      <div style={{ marginTop: "16px" }} className={style.container}>
        <div className={style.section}>
          <span className={style.section_title}>Giới thiệu</span>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{
              __html:
                org.content ||
                org.description ||
                `
              <p>&emsp;Chào mừng bạn đến với ${org.name} - nơi mang đến sự thư giãn và chăm sóc toàn diện cho cơ thể và tâm hồn của bạn. Tại ${org.name}, chúng tôi tạo ra một không gian yên tĩnh và sang trọng, nơi bạn có thể tránh xa cuộc sống bận rộn và thả mình vào không gian tuyệt vời của sự thư thái.</p>
              </br>
              <p>Với đội ngũ chuyên gia làm đẹp giàu kinh nghiệm, chúng tôi cam kết mang đến cho bạn những trải nghiệm làm đẹp tốt nhất. Từ dịch vụ chăm sóc da mặt chuyên sâu, liệu pháp massage thư giãn đến các liệu trình làm đẹp độc đáo, chúng tôi sẽ giúp bạn tìm thấy sự cân bằng và sự tự tin trong vẻ ngoài của mình.</p>
              </br>
              <p>Chúng tôi sử dụng những sản phẩm chất lượng cao và phương pháp làm đẹp tiên tiến để đảm bảo kết quả tốt nhất cho khách hàng. Mỗi dịch vụ được cá nhân hóa và tùy chỉnh theo nhu cầu và mong muốn riêng của bạn. Bạn sẽ được tận hưởng không chỉ sự chăm sóc tuyệt vời mà còn là trải nghiệm thực sự thư giãn và độc đáo.</p>
              </br>
              <p>Hãy để ${org.name} làm đẹp chúng tôi chăm sóc bạn từ đầu đến chân, mang đến cho bạn không chỉ vẻ đẹp ngoại hình mà còn sự tự tin và cảm giác tuyệt vời từ bên trong. Đến với chúng tôi và trải nghiệm một cuộc sống đẹp hơn, một phiên bản tốt hơn của chính bạn!</p>
              `,
            }}
          />
        </div>

        <div className={style.section}>
          <span className={style.section_title}>Bản đồ & Chi nhánh</span>
          <div className={style.map_cnt}>
            <MapGL
              style={{
                width: "100%",
                height: "100%",
              }}
              initialViewState={{
                latitude: org.latitude,
                longitude: org.longitude,
                zoom: 15,
              }}
              attributionControl={true}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v10"
            >
              <NavigationControl
                position="bottom-right"
                showZoom={true}
                showCompass={true}
              />
              <Marker latitude={org.latitude} longitude={org.longitude}>
                <div className={style.marker_item}>
                  <img src={icon.homePurpleBold} alt="" />
                  <div style={{ zIndex: 10 }} className={style.marker_card}>
                    <p className={style.marker_card_name}>{org.name}</p>
                    <p className={style.marker_card_address}>
                      {org.full_address}
                    </p>
                  </div>
                </div>
              </Marker>
              {org.branches.length > 0 &&
                org.branches.map((item, index: number) => (
                  <Marker
                    key={index}
                    latitude={item.latitude ?? 0}
                    longitude={item.longitude ?? 0}
                  >
                    <div className={style.marker_item}>
                      <img src={icon.homePurpleBold} alt="" />
                      <div className={style.marker_card}>
                        <p className={style.marker_card_name}>{item.name}</p>
                        <p className={style.marker_card_address}>
                          {item.full_address}
                        </p>
                      </div>
                    </div>
                  </Marker>
                ))}
            </MapGL>
          </div>

          <div onClick={() => setMap(true)} className={style.more_map}>
            Hiển thị thêm {">"}
          </div>

          <OrgItemMap open={map} setOpen={setMap} org={org} />
        </div>

        <div style={{ marginTop: "16px" }} className={style.section}>
          <Comment
            org_id={org.id}
            commentable_id={org.id}
            commentable_type="ORGANIZATION"
            commentsMixed={commentsMixed}
          />
        </div>
      </div>
    </Container>
  );
};

const PreviewMedia: FC = () => {
  const { trends, org } = useContext(OrgContext) as OrgContextType;
  const [openTrends, setOpenTrends] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef<Slider | null>(null);
  const history = useHistory();
  const handleGotoSer = (item: ITrend) => {
    history.push(
      formatRouterLinkService(
        item.services[0].id,
        org.id,
        item.services[0].service_name
      )
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: function (currentSlide: any) {
      setCurrentSlide(currentSlide);
    },
    // responsive: [
    //   {
    //     breakpoint: 1023,
    //     settings: {
    //       dots: false,
    //       arrows: false,
    //       vertical: true,
    //       verticalSwiping: true,
    //       swipeToSlide: true,
    //     },
    //   },
    // ],
  };
  const handleOpenTrends = (i: number) => {
    setOpenTrends(true);
    setTimeout(() => {
      slider.current?.slickGoTo(i);
    }, 100);
  };

  return (
    <div className={style.about_trends}>
      <span className={style.section_title}>Review làm đẹp</span>
      <ul className={style.about_trends_lists}>
        {trends.slice(0, 5).map((item: ITrend, index: number) => (
          <li
            onClick={() => handleOpenTrends(index)}
            key={index}
            className={style.about_trends_item}
          >
            <div
              onClick={(e) => {
                handleGotoSer(item);
                e.stopPropagation();
              }}
              className={style.about_trends_org}
            >
              <img
                className={style.about_trends_org_img}
                src={item.organization_image}
                alt=""
              />
              <div className={style.about_trend_service}>
                <p className={style.about_trends_ser_name}>
                  {item?.services[0].service_name}
                </p>
                <div className={style.about_trends_ser_prices}>
                  {item?.services[0].special_price > 0 ? (
                    <>
                      <span className={style.about_trends_ser_special}>
                        {formatPrice(item.services[0].special_price)}đ
                      </span>
                      <span className={style.about_trends_ser_price}>
                        {formatPrice(item.services[0].price)}đ
                      </span>
                    </>
                  ) : (
                    <span className={style.about_trends_ser_price}>
                      {formatPrice(item.services[0].price)}đ
                    </span>
                  )}
                </div>
              </div>
            </div>

            <video
              poster={item?.image_thumb}
              webkit-playsinline="webkit-playsinline"
              className={style.about_trends_video}
            >
              <source type="video/mp4" src={`${item?.media_url}#t=0.001`} />
            </video>
          </li>
        ))}
      </ul>
      <Dialog className={style.dialog_video} open={openTrends} fullScreen>
        <XButton
          className={style.about_popup_btn_cancel}
          onClick={() => setOpenTrends(false)}
          icon={icon.chevronRightBlack}
          iconSize={20}
        />
        <div className={style.about_popup}>
          <Slider ref={slider} {...settings}>
            {trends.map((item, index) => (
              <Video org={org} key={index} trend={item} />
            ))}
          </Slider>
          <XButton
            style={currentSlide === 0 ? { display: "none" } : {}}
            className={style.about_btn_arr1}
            onClick={() => slider?.current?.slickPrev()}
            icon={icon.chevronRightBlack}
            iconSize={20}
          />
          <XButton
            style={
              trends.length - 1 === currentSlide ? { display: "none" } : {}
            }
            className={style.about_btn_arr2}
            onClick={() => slider?.current?.slickNext()}
            icon={icon.chevronRightBlack}
            iconSize={20}
          />
        </div>
      </Dialog>
    </div>
  );
};

interface VideoProps {
  trend: ITrend;
  org: IOrganization;
}
interface TrendsDetailCommentProps {
  comments: ITrendComment[];
  org_id: string | number;
  postComment: (body?: any) => void;
  loadPost: boolean;
}
interface Model {
  model_id: number;
  original_url: string;
}
interface InitialBody {
  commentable_type: string;
  commentable_id: number | string;
  organization_id: number | string;
  models: Model[];
  body: string;
}

const Video: FC<VideoProps> = ({ trend, org }) => {
  console.log(trend);
  const videoRef = useRef<HTMLVideoElement>(null);
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onToggleFavorite, favoriteSt } = useFavorite({
    org_id: org?.id,
    type: "ORG",
    count: org?.favorites_count,
    favorite: org?.is_favorite,
  });
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisible = useElementOnScreen(options, videoRef);

  const onVideoPress = () => {
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  const handleGotoSer = (item: ITrend) => {
    history.push(
      formatRouterLinkService(
        item.services[0].id,
        org.id,
        item.services[0].service_name
      )
    );
  };

  const param: ParamComment = {
    ...paramsComment,
    "filter[commentable_type]": "ORGANIZATION",
    "filter[commentable_id]": org?.id,
    limit: 10,
  };
  const { totalComment } = useComment(param);

  useEffect(() => {
    onVideoPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => videoRef.current?.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div key={trend._id} className={style.about_popup_videos}>
      <div className={style.about_popup_video}>

        <div className={style.about_trends_org}
          onClick={(e) => {
            handleGotoSer(trend);
            e.stopPropagation();
          }}
        >
          <img
            className={style.about_trends_org_img}
            src={trend.organization_image}
            alt=""
          />
          <div className={style.about_trend_service}>
            <p className={style.about_trends_ser_name}>
              {trend?.services[0].service_name}
            </p>
            <div className={style.about_trends_ser_prices}>
              {trend?.services[0].special_price > 0 ? (
                <>
                  <span className={style.about_trends_ser_special}>
                    {formatPrice(trend.services[0].special_price)}đ
                  </span>
                  <span className={style.about_trends_ser_price}>
                    {formatPrice(trend.services[0].price)}đ
                  </span>
                </>
              ) : (
                <span className={style.about_trends_ser_price}>
                  {formatPrice(trend.services[0].price)}đ
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={style.about_popup_videos_btns}>
          <div className={style.about_popup_videos_btn}>
            <XButton
              onClick={onToggleFavorite}
              icon={
                favoriteSt.is_favorite
                  ? icon.heartBoldRed
                  : icon.heartSolidWhite
              }
              iconSize={28}/>
            <p className={style.about_popup_videos_count}>
              {formatCountTrends(
                trend?.tiktok?.digg_count + (favoriteSt.favorite_count ?? 0)
              )}
            </p>
          </div>
          <div className={style.about_popup_videos_btn}>
            <XButton icon={icon.eyeWhite} iconSize={28}/>
            <p className={style.about_popup_videos_count}>
              {formatCountTrends(trend?.tiktok?.play_count)}
            </p>
          </div>
          <div className={style.about_popup_videos_btn}>
            <XButton
              icon={icon.chatWhite}
              iconSize={28}
              onClick={(e) => {
                setOpenDrawer(true);
                e.stopPropagation();
              }}
            />
            <p className={style.about_popup_videos_count}>
              {formatCountTrends(trend?.tiktok?.comment_count +  totalComment)}
            </p>
          </div>
          <div className={style.about_popup_videos_btn}>
            <XButton icon={icon.shareWhiteArrow} iconSize={28}/>
            <p className={style.about_popup_videos_count}>
              {formatCountTrends(trend?.tiktok?.share_count)}
            </p>
          </div>
        </div>

        <DrawerAbout
          openDrawer={openDrawer}
          org={org}
          trend={trend}
          setOpenDrawer={setOpenDrawer}
          onToggleFavorite={onToggleFavorite}
          favoriteSt={favoriteSt}
        />

        <video
          webkit-playsinline="webkit-playsinline"
          playsInline={true}
          ref={videoRef}
          key={trend._id}
          controls={true}
          autoPlay={true}
          loop
          poster={trend.image_thumb}
        >
          <source type="video/mp4" src={`${trend?.media_url}#t=0.001`} />
        </video>
      </div>
    </div>
  );
};

const TrendsDetailComment = (props: TrendsDetailCommentProps) => {
  const { loadPost, postComment } = props;
  const org_id = props.org_id;
  const refCommentCnt = useRef<HTMLUListElement>(null);
  const initialBody = {
    commentable_type: "ORGANIZATION",
    commentable_id: org_id,
    organization_id: org_id,
    models: [],
    body: "",
  };
  const { USER } = useSelector((state: IStore) => state.USER);
  const [body, setBody] = useState<InitialBody>(initialBody);
  const onInputChange = (e: any) => {
    setBody({ ...body, body: e.target.value });
  };
  const onChangeInputMedia = async (e: any) => {
    // const { mediaList } = await postMediaMulti(e);
    // setBody({
    //   ...body,
    //   models: mediaList,
    // });
  };
  const onRemoveImg = (id: number) => {
    setBody({
      ...body,
      models: body.models.filter((i) => i.model_id !== id),
    });
  };
  const onSubmitComment = async () => {
    if (body.body !== "" || body.models.length > 0) {
      await postComment({
        ...body,
        media_ids: body.models.map((i) => i.model_id),
      });
      setBody(initialBody);
      if (refCommentCnt) {
        refCommentCnt.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className={styleTrends.comment_container}>
        <ul ref={refCommentCnt} className={styleTrends.comment_list}>
          {props.comments?.map((item: ITrendComment, index: number) => (
            <li key={index} className={styleTrends.comment_list_item}>
              <CommentItem comment={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styleTrends.comment_input}>
        <div className={styleTrends.comment_user_avatar}>
          <img
            src={USER?.avatar ?? icon.userCircle}
            alt=""
            onError={(e) => onErrorImg(e)}
          />
        </div>
        <div className={styleTrends.comment_input_cnt}>
          <div className={styleTrends.comment_img_thumb}>
            <ul className={styleTrends.img_thumb_list}>
              {body.models.map((i) => (
                <li
                  key={i.model_id}
                  className={styleTrends.img_thumb_list_item}
                >
                  <XButton
                    icon={icon.closeCircle}
                    onClick={() => onRemoveImg(i.model_id)}
                  />
                  <img
                    className={styleTrends.img_thumb_item}
                    src={i.original_url}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styleTrends.comment_input_wrap}>
            <Input
              value={body.body}
              onChange={onInputChange}
              classNamePar={styleTrends.comment_input_par}
              className={styleTrends.comment_input_child}
              placeholder="Viết bình luận..."
              onKeyDown={onSubmitComment}
            />
            <div className={styleTrends.comment_input_ctrl}>
              <XButtonFile
                onChange={onChangeInputMedia}
                className={styleTrends.comment_btn}
                multiple={true}
              />
              <XButton
                icon={icon.sendBlack}
                className={styleTrends.comment_btn}
                onClick={onSubmitComment}
                loading={loadPost}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadComment = () => {
  return (
    <ul className={styleTrends.detail_comment_list}>
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className={styleTrends.load_item}>
          <div className={styleTrends.load_item_left}>
            <Skeleton
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div className={styleTrends.load_item_right}>
            <Skeleton width={"100%"} height={"100%"} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const CommentItem = ({ comment }: { comment: ITrendComment }) => {
  let body = comment.body;
  try {
    body = JSON.parse(comment.body).text;
  } catch (error) {
    body = comment.body;
  }

  return (
    <div className={styleTrends.comment_item_cnt}>
      <div className={styleTrends.comment_item_par}>
        <div className={styleTrends.comment_user_avatar}>
          <img
            src={comment.user?.avatar ?? icon.userCircle}
            onError={(e) => onErrorImg(e)}
            alt=""
          />
        </div>
        <div className={styleTrends.comment_item_par_right}>
          <div className={styleTrends.comment_item_box}>
            <p className={styleTrends.comment_text}>
              <span className={styleTrends.comment_user_name}>
                {comment.user?.fullname}
              </span>
              {body}
            </p>
          </div>
    
          <ul className={styleTrends.comment_item_images}>
            {comment.media_url?.map((url: string, index: number) => (
              <li key={index} className={styleTrends.comment_item_image}>
                <div className={styleTrends.comment_item_image_cnt}>
                  <img src={url} alt="" />
                </div>
              </li>
            ))}
          </ul>

          {comment?.children.length === 0 ? (
            <></>
          ) : (
            <ul className={styleTrends.comment_item_child}>
              {comment?.children?.map((child: ITrendCommentChild, i: number) => (
                <li key={i} className={styleTrends.comment_item_child_item}>
                  <div className={styleTrends.comment_user_avatar}>
                    <img
                      src={child.user?.avatar ?? icon.userCircle}
                      alt=""
                      onError={(e) => onErrorImg(e)}
                    />
                  </div>
                  <div className={styleTrends.comment_item_par_right}>
                    <div
                      style={{ backgroundColor: "#EAE9F5" }}
                      className={styleTrends.comment_item_box}
                    >
                      <p className={styleTrends.comment_text}>
                        <span className={styleTrends.comment_user_name}>
                          {child.user?.fullname}
                        </span>
                        {child.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

interface IDrawerAbout {
  openDrawer: boolean;
  setOpenDrawer: any;
  org: IOrganization;
  trend: ITrend;
  onToggleFavorite: () => void;
  favoriteSt: {
    is_favorite: boolean;
    favorite_count: number;
  };
}
const DrawerAbout = ({
  openDrawer,
  setOpenDrawer,
  org,
  trend,
  onToggleFavorite,
  favoriteSt,
}: IDrawerAbout) => {
  const IS_MB = useDeviceMobile();
  const param: ParamComment = {
    ...paramsComment,
    "filter[commentable_type]": "ORGANIZATION",
    "filter[commentable_id]": org?.id,
    limit: 10,
  };
  const { comments, loadPost, postComment, totalComment } = useComment(param);
  const { resData, totalItem, isValidating } = useFetchInfinite(
    trend._id,
    `${API_3RD.API_NODE}/tiktok/getCommentsByUrl`,
    { "filter[trend]": trend._id }
  );
  const commentsTrend = resData ?? [];
  const onOrgDetail = () => {
    // history.push(
    //   formatRouterLinkOrg(org?.subdomain ?? trend?.organization_id)
    // );
  };
  return (
    <Drawer
      className={style.cusDrawer}
      anchor={`${!IS_MB ? "right" : "bottom"}`}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <div className={styleTrends.right}>
        <div className={styleTrends.right_top}>
          <div className={styleTrends.right_top_org}>
            <div onClick={onOrgDetail} className={styleTrends.org_detail}>
              <div className={styleTrends.org_detail_img}>
                <img src={trend.organization_image} alt="" />
              </div>
              <div className={styleTrends.org_detail_right}>
                <p className={styleTrends.org_detail_name}>
                  {trend.organization_name}
                </p>
                <p className={styleTrends.time_late}>
                  {formatDateFromNow(trend.createdAt)}
                </p>
              </div>
            </div>
            <XButton
              onClick={onToggleFavorite}
              className={
                favoriteSt.is_favorite
                  ? styleTrends.right_top_org_btn
                  : styleTrends.org_btn_act
              }
              title={favoriteSt.is_favorite ? "Đang theo dõi" : "Theo dõi"}
            />
          </div>
          <div className={styleTrends.right_top_content}>
            <p className={styleTrends.title}>{trend.title}</p>
            <p className={styleTrends.content}>{trend.content}</p>
          </div>
          <div className={styleTrends.right_top_services}>
            {trend.services?.map((service) => (
              <Link
                key={service.id}
                to={{
                  pathname: formatRouterLinkService(
                    service.id,
                    trend.organization_id,
                    service.service_name
                  ),
                }}
              >
                <span className={styleTrends.service_link_text}>
                  #{service.service_name}
                </span>
              </Link>
            ))}
          </div>
          <div className={styleTrends.interactive}>
            <div className={styleTrends.interactive_item}>
              <XButton
                iconSize={16}
                className={styleTrends.interactive_icon_btn}
                icon={icon.eyeBoldBlack}
              />
              <span className={styleTrends.interactive_item_text}>
                {trend?.tiktok?.play_count}
              </span>
            </div>
            <div className={styleTrends.interactive_item}>
              <XButton
                iconSize={16}
                className={styleTrends.interactive_icon_btn}
                onClick={onToggleFavorite}
                icon={
                  favoriteSt.is_favorite
                    ? icon.heartBoldRed
                    : icon.heartBoldBlack
                }
              />
              <span className={styleTrends.interactive_item_text}>
                {trend?.tiktok?.digg_count + (favoriteSt.favorite_count ?? 0)}
              </span>
            </div>
            <div className={styleTrends.interactive_item}>
              <XButton
                iconSize={16}
                className={styleTrends.interactive_icon_btn}
                icon={icon.commentBoldBlack}
              />
              <span className={styleTrends.interactive_item_text}>
                {trend?.tiktok?.comment_count + totalComment}
              </span>
            </div>
            <div className={styleTrends.interactive_item}>
              <XButton
                iconSize={16}
                className={styleTrends.interactive_icon_btn}
                icon={icon.shareBoldBlack}
              />
              <span className={styleTrends.interactive_item_text}>
                {trend?.tiktok?.share_count}
              </span>
            </div>
          </div>
        </div>
        {totalItem === 1 && isValidating && <LoadComment />}
        {resData && (
          <TrendsDetailComment
            org_id={trend.organization_id}
            comments={[...comments, ...commentsTrend]}
            postComment={postComment}
            loadPost={loadPost}
          />
        )}
      </div>
    </Drawer>
  );
};
