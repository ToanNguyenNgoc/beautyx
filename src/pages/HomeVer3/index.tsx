import HeaderVer3 from "components/HeaderVer3";
import useDevToolsDetector from "hooks/useDevtoolDetech";
import styles from "./style.module.css"
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
import FooterVer3 from "components/FooterVer3";

export default function HomeVer3() {
    // useDevToolsDetector();
    return (
        <div className={styles.home}>
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
            <FooterVer3/>
        </div>
    );
}
