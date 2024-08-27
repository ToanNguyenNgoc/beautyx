import React, { useState } from "react";
import styles from "./style.module.css";
import { Container } from "@mui/material";

export default function Discover() {
    // Định nghĩa type cho thành phố
    const [activeCity, setActiveCity] = useState<string>("TP. Hồ Chí Minh");

    const cities: string[] = [
        "TP. Hồ Chí Minh",
        "Hà Nội",
        "Đà Nẵng",
        "Hải Phòng",
        "Cần Thơ",
        "Thanh Hoá",
        "Đồng Nai",
        "Quảng Ninh",
        "Vĩnh Phúc",
    ];

    const handleCityClick = (city: string) => {
        setActiveCity(city);
    };

    return (
        <div className={styles.discover}>
            <Container maxWidth="md">
                <h2>Khám phá địa điểm</h2>
                <div className={styles.discover__wrap}>
                    {cities.map((city, index) => (
                        <div
                            key={index}
                            className={`${styles.discover__btn} ${
                                activeCity === city ? styles.active : ""
                            }`}
                            onClick={() => handleCityClick(city)}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
