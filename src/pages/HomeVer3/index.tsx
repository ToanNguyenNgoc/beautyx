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
} from "pages/HomeVer3/components";
import Choose from "pages/HomeVer3/components/choose";
import Discover from "pages/HomeVer3/components/discover";
import Partner from "pages/HomeVer3/components/partner";

export default function HomeVer3() {
    return (
        <>
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
