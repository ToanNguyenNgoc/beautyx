import styles from "./style.module.css";
import icon from "constants/icon";
import { Container } from "@mui/material";
export function Recommend() {
    return (
        <div className={styles.recommend}>
            <Container maxWidth="md">
                <h2 className={styles.title}>Gợi ý spa dành cho bạn</h2>
                <div className={styles.recommend__list}>
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className={styles.recommend__item}>
                            <div className={styles.recommend__item__img}>
                                <img
                                    src="https://images.pexels.com/photos/979248/pexels-photo-979248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="recommend"
                                />
                            </div>
                            <div className={styles.recommend__item__content}>
                                <div className={styles.recommend__item__head}>
                                    <div className={styles.distance}>~ 2km</div>
                                    <h3 className={styles.name}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Praesentium fuga
                                        ducimus rerum doloremque, temporibus sit
                                        voluptate delectus quidem illo quo
                                        obcaecati sapiente corrupti veritatis.
                                        Atque rerum veniam nam! Obcaecati,
                                        eaque!
                                    </h3>
                                </div>
                                <div className={styles.recommend__item__bottom}>
                                    <div className={styles.bottom__rating}>
                                        <span
                                            className={
                                                styles.bottom__start__count
                                            }
                                        >
                                            4.5
                                        </span>
                                        <img src={icon.startBold} alt="" />
                                        <img src={icon.startBold} alt="" />
                                        <img src={icon.startBold} alt="" />
                                        <img src={icon.startBold} alt="" />
                                        <img src={icon.starLine} alt="" />
                                        <span
                                            className={
                                                styles.bottom__rating__count
                                            }
                                        >
                                            (230)
                                        </span>
                                    </div>
                                    <div className={styles.category}>
                                        <p>spa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
