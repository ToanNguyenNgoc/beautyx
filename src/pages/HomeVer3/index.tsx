import HeaderVer3 from "components/HeaderVer3";
import useDevToolsDetector from "hooks/useDevtoolDetech";
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

export default function HomeVer3() {
    // useDevToolsDetector();
    return (
        <>
            <HeaderVer3/>
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
