import style from "./style.module.css";
import thumbApp from "assets/image/thumbApp.png";
import { XButton } from "components/Layout/XButton";
import img from "constants/img";
import { useContext } from "react";
import { AppContext } from "context/AppProvider";

export default function TrafficData() {
  const { t } = useContext(AppContext) as any;
  const data = [
    {
      id: 1,
      count: `+10,000 ${t("Home.traffic_enterprise")}`,
      desc: `${t("Home.traffic_nationwide")}`,
    },
    {
      id: 2,
      count: `38,630,265 ${t("Home.traffic_user")}`,
      desc: `${t("Home.traffic_domestically_and_internationally")}`,
    },
    {
      id: 3,
      count: `48,841 ${t("Home.traffic_evaluate")}`,
      desc: `${t("Home.traffic_share")}`,
    },
    {
      id: 4,
      count: `65,121 ${t("Home.traffic_appointment_bookings")}`,
      desc: `${t("Home.traffic_accomplished")}`,
    },
  ];
  return (
    <div className={style.home_trafficData}>
      <h3 className={style.home_trafficData_title}>
        {t("Home.traffic_title")}
      </h3>
      <div className={style.home_trafficData_wrap}>
        <div className={style.home_trafficData_left}>
          <p className={style.home_trafficData_left_title}>
            {t("Home.traffic_statistical")}
          </p>
          <ul className={style.home_trafficData_left_list}>
            {data.map((item) => (
              <li key={item.id} className={style.home_trafficData_left_item}>
                <div className={style.home_trafficData_left_count}>
                  {item.count}
                </div>
                <div className={style.home_trafficData_left_desc}>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{ backgroundImage: `url(${thumbApp})` }}
          className={style.home_trafficData_right}
        >
          <div className={style.home_trafficData_right_content}>
            <div className={style.home_trafficData_right_desc}>
              {t("Home.discover")} <span>+10.000</span>
              <br /> {t("Home.traffic_beauty_place")}
              <br /> {t("Home.traffic_downapp")}
            </div>
            <div className={style.home_trafficData_right_buttons}>
              <XButton
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.myspa.beautyx",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className={style.home_trafficData_right_button}
                icon={img.playStore}
              />
              <XButton
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className={style.home_trafficData_right_button}
                icon={img.appStore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
