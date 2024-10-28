import React from "react";
import style from "./style.module.css";
import img from "constants/img";
import icon from "constants/icon";
const opinionsData = [
    {
        imgSrc: img.aboutOpinion1,
        name: "Bác sĩ CKII Phạm Minh Trường",
        position: "Founder và CEO PMT Aesthetic Clinic",
        content:
            "Lorem ipsum dolor sit amet consectetur. Placerat sit quam placerat suspendisse pulvinar leo mi. Lacinia vitae in id quisque senectus.",
        stars: 6,
    },
    {
        imgSrc: img.aboutOpinion2,
        name: "Bác sĩ CKII Phạm Minh Trường",
        position: "Founder và CEO PMT Aesthetic Clinic",
        content:
            "Lorem ipsum dolor sit amet consectetur. Placerat sit quam placerat suspendisse pulvinar leo mi. Lacinia vitae in id quisque senectus.",
        stars: 6,
    },
    {
        imgSrc: img.aboutOpinion3,
        name: "Bác sĩ CKII Phạm Minh Trường",
        position: "Founder và CEO PMT Aesthetic Clinic",
        content:
            "Lorem ipsum dolor sit amet consectetur. Placerat sit quam placerat suspendisse pulvinar leo mi. Lacinia vitae in id quisque senectus.",
        stars: 6,
    },
];
export const AboutOpinion = () => {
    return (
        <div className={style.opinion}>
            <div className={style.container}>
                <h2 className={style.title}>Ý kiến từ chuyên gia</h2>
                <div className={style.opinion_list}>
                    {opinionsData.map((opinion, index) => (
                        <div className={style.opinion_item} key={index}>
                            <div className={style.item_img}>
                                <img
                                    src={opinion.imgSrc}
                                    alt={`aboutOpinion${index + 1}`}
                                />
                            </div>
                            <div className={style.item_content}>
                                <div className={style.item_top}>
                                    <h3>{opinion.name}</h3>
                                    <span>{opinion.position}</span>
                                    <p>{opinion.content}</p>
                                </div>
                                <div className={style.stars}>
                                    {Array.from({ length: opinion.stars }).map(
                                        (_, i) => (
                                            <div className={style.star} key={i}>
                                                <img
                                                    src={icon.star}
                                                    alt={`star-${i}`}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
