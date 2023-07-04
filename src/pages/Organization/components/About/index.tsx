import { Container, Dialog } from "@mui/material";
import style from "./about.module.css";
import { useContext, useState, useRef, FC, useEffect } from "react";
import { OrgContext, OrgContextType } from "context";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import icon from "constants/icon";
import { OrgItemMap } from "components/Layout/OrgItemMap";
import Comment from "components/Comment";
import { ITrend } from "pages/Trends/trend.interface";
import { XButton } from "components/Layout/XButton";
import Slider from "react-slick";
import { useElementOnScreen } from "hooks/useElementOnScreen";
import formatPrice from "utils/formatPrice";
import { formatRouterLinkService } from "utils/formatRouterLink/formatRouter";
import { useHistory } from "react-router-dom";
import { IOrganization } from "interface";

export const About = () => {
  const { org, trends } = useContext(OrgContext) as OrgContextType;
  const [map, setMap] = useState(false);
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
    arrows: true,
    afterChange: function (currentSlide: any) {
      setCurrentSlide(currentSlide);
    },
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          dots: false,
          arrows: false,
          vertical: true,
          verticalSwiping: true,
          swipeToSlide: true,
        },
      },
    ],
  };
  const handleOpenTrends = (i: number) => {
    setOpenTrends(true)
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
const Video: FC<VideoProps> = ({ trend, org }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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
  useEffect(() => {
    onVideoPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => videoRef.current?.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  return (
    <div key={trend._id} className={style.about_popup_videos}>
      <div className={style.about_popup_video}>
        <div
          onClick={(e) => {
            handleGotoSer(trend);
            e.stopPropagation();
          }}
          className={style.about_trends_org}
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
        <video
          webkit-playsinline="webkit-playsinline"
          playsInline={true}
          ref={videoRef}
          key={trend._id}
          controls={true}
          loop
          poster={trend.image_thumb}
        >
          <source type="video/mp4" src={`${trend?.media_url}#t=0.001`} />
        </video>
      </div>
    </div>
  );
};
