import { Container, Dialog } from "@mui/material"
import style from "./about.module.css"
import { useContext, useState, useRef, FC, Dispatch, SetStateAction } from "react";
import { OrgContext, OrgContextType } from "context"
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import icon from "constants/icon";
import { OrgItemMap } from "components/Layout/OrgItemMap";
import Comment from "components/Comment";
import { ITrend } from "pages/Trends/trend.interface";
import { XButton } from "components/Layout/XButton";

export const About = () => {
  const { org, trends } = useContext(OrgContext) as OrgContextType
  console.log(trends)
  const [map, setMap] = useState(false)
  const [openTrends, setOpenTrends] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);
  const onTogglePlayVideo = (play: boolean) => {
    if (play) return videoRef.current?.play();
    if (!play) return videoRef.current?.pause();
  };
  return (
    <Container>
      {trends.length !== 0 && (
        <div className={style.container}>
          <div className={style.section}>
            <span className={style.section_title}>
              Xu hướng làm đẹp tại doanh nghiệp
            </span>
            <ul className={style.about_trends_lists}>
              {trends.slice(0, 5).map((item: ITrend, index: number) => (
                <li
                  onClick={() => setOpenTrends(true)}
                  key={index}
                  className={style.about_trends_item}
                >
                  <div className={style.about_trends_org}>
                    <img
                      className={style.about_trends_org_img}
                      src={item.organization_image}
                      alt=""
                    />
                    <p className={style.about_trends_org_name}>
                      {item.organization_name}
                    </p>
                  </div>
                  <video
                    ref={videoRef}
                    onMouseEnter={() => onTogglePlayVideo(true)}
                    onMouseLeave={() => onTogglePlayVideo(false)}
                    webkit-playsinline="webkit-playsinline"
                    playsInline={true}
                    className={style.about_trends_video}
                  >
                    <source
                      type="video/mp4"
                      src={`${item.media_url}#t=0.001`}
                    />
                  </video>
                </li>
              ))}
            </ul>
            <PreviewMedia
              openTrends={openTrends}
              setOpenTrends={setOpenTrends}
            />
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
}

interface PreviewMediaProps {
  openTrends: boolean;
  setOpenTrends: Dispatch<SetStateAction<boolean>>;
  // item: ITrend;
}

const PreviewMedia: FC<PreviewMediaProps> = ({ openTrends, setOpenTrends }) => {
  const { trends } = useContext(OrgContext) as OrgContextType
  return (
    <Dialog open={openTrends} fullScreen>
      <XButton
        className={style.about_popup_btn_cancel}
        onClick={() => setOpenTrends(false)}
        icon={icon.chevronRightBlack}
        iconSize={20}
      />
      <div className={style.about_popup}>
        <div className={style.about_pop_video}>
          <video
            controls={true}
            autoPlay={true}
            className={style.about_trends_video}
            webkit-playsinline="webkit-playsinline"
            playsInline={true}
          >
            <source type="video/mp4" src={`${trends[0]?.media_url}#t=0.001`} />
          </video>
        </div>
      </div>
    </Dialog>
  )
}