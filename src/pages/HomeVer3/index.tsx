import HeaderVer3 from "components/HeaderVer3";
import {
    Advantage,
    BannerPromotions,
    Endow,
    Hero,
    Recommend,
    Guide,
    Address,
    Opinion,
    Introduce,
    Qr,
    Category,
    Choose,
    Partner,
    Discover,
} from "pages/HomeVer3/components";
import { useEffect } from "react";

export default function HomeVer3() {
    useEffect(() => {
        const headerElement = document.getElementById("header");

        if (window.location.pathname === "/home-ver3") {
            if (headerElement) {
                headerElement.style.display = "none";
            }
        } else {
            if (headerElement) {
                headerElement.style.display = "block";
            }
        }
    }, []);
    return (
        <>
            <HeaderVer3 />
            <Hero />
            <BannerPromotions />
            <Endow />
            <Recommend />
            <Address />
            <Choose />
            <Advantage />
            <Guide />
            <Opinion />
            <Introduce />
            <Qr />
            <Partner />
            <Discover />
            <Category />
        </>
    );
}
