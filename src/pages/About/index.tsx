import {
    AboutBeautyX,
    AboutFooter,
    AboutHero,
    AboutOpinion,
    AboutSlider,
    AboutStory,
} from "pages/About/components";
import style from "./style.module.css";

export default function AboutPage() {
    return (
        <div className={style.about}>
            <AboutHero />
            <AboutStory />
            <AboutBeautyX />
            <AboutOpinion />
            <AboutSlider />
            <AboutFooter />
        </div>
    );
}
