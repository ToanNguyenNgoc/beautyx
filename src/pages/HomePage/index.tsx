/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import tracking from "api/trackApi";
import { OpenApp, PlashScreen } from "components/Layout";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import { useDeviceMobile } from "hooks";
import HomeDiscount from "./HomeDiscounts";
import TrafficData from "./HomeTrafficData";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { STATUS } from "redux/status";
import HomeBanner2 from "./HomeBanner2";
import HomeCate from "./HomeCate";
import HomeCate2 from "./HomeCate2";
import HomeCurrentLocation from "./HomeCurrentLocation";
import HomeOrgDistance from "./HomeOrgDistance";
import HomePartners from "./HomePartners";
import HomeProvince from "./HomeProvince";
import HomeTags2 from "./HomeTags2";
import HomeApprove from "./HomeApprove";
import HomeTrends from "./HomeTrends";
import HomeWhyNot from "./HomeWhyNot";
import style from "./home.module.css";
import HomePromotions from "./HomePromotions";
import PortDeal from "components/PortalDeal";

export default function HomePage() {
    const IS_MB = useDeviceMobile();
    const [banner_status] = useSelector((state: any) => [state.HOME.status, state.USER]);
    useEffect(() => {
        tracking.HOME_LOAD();
    }, [])
    return (
        <>  <PortDeal/>
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
                                <HomeBanner2 />
                                {IS_MB ? <HomeCate2 /> : <HomeTags2 />}
                            </>
                        )}
                    </Container>
                </div>
                <HomeDiscount />
                <Container>
                    <HomeOrgDistance />
                    <HomePromotions />
                    <HomeApprove />
                    <HomeWhyNot />
                    <HomeProvince />
                    {IS_MB ? <></> : <HomeTrends />}
                    <HomePartners />
                    <TrafficData />
                </Container>
                <OpenApp type="none" />
            </div>
        </>
    );
}
