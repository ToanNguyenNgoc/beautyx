/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container } from "@mui/material";
import {
  HomeApprove,
  HomeBanner,
  HomeCate,
  HomeCateMobile,
  HomeCurrentLocation,
  HomeDiscount,
  HomeOrgDistance,
  HomePartners,
  HomePromotions,
  HomeProvince,
  HomeTag,
  HomeTrafficData,
  HomeTrends,
  HomeWhyNot,
  HomeStatisticsCustomer,
  HomePrettier,
  HomeLocation
} from "./components"
import tracking from "api/trackApi";
import { OpenApp, PlashScreen } from "components/Layout";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import { useDeviceMobile } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { STATUS } from "redux/status";
import style from "./home.module.css";
import PortDeal from "components/PortalDeal";
import { isPlatformViettel } from "utils";

export default function HomePage() {
  const IS_MB = useDeviceMobile();
  const [banner_status] = useSelector((state: any) => [state.HOME.status, state.USER]);
  useEffect(() => {
    tracking.HOME_LOAD();
  }, []);


  return (
    <>
      <PortDeal />
      <div className={style.container}>
        <div className="home_container_par">
          <Container>
            <div className={style.home_cate_head}>
              <HomeCate />
              {!IS_MB && <HomeCurrentLocation />}
            </div>
            {banner_status !== STATUS.SUCCESS ? (
              <>{IS_MB ? <PlashScreen /> : <LoadHomeBanner />}</>
            ) : (
              <>
                <HomeBanner />
                {IS_MB ? <HomeCateMobile /> : <HomeTag />}
              </>
            )}
          </Container>
        </div>
        <HomeDiscount />
        <HomePrettier hidden={true} />
        <Container>
          <HomeOrgDistance />
          <HomePromotions />
          <HomeApprove />
          <HomeWhyNot />
          <HomeProvince />
          {IS_MB ? <></> : <HomeTrends />}
          <HomePartners />
          {!isPlatformViettel() ? <HomeTrafficData /> : null}
          <HomeLocation />
          <HomeStatisticsCustomer />
        </Container>
        <OpenApp type="none" />
      </div>
    </>
  );
}