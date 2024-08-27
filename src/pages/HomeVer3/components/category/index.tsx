import React from "react";
import styles from "./style.module.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Spa",
        items: [
            "Masage",
            "Gội đầu dưỡng sinh",
            "Chăm sóc da mặt",
            "Xông hơi",
            "Vật lý trị liệu",
        ],
    },
    {
        title: "Salon",
        items: [
            "Cắt tóc",
            "Nhuộm tóc",
            "Gội đầu",
            "Uốn - Duỗi tóc",
            "Phục hồi tóc",
        ],
    },
    {
        title: "Thẩm Mỹ Viện",
        items: [
            "Trị nám",
            "Triệt lông",
            "Giảm béo",
            "Tiêm Botox",
            "Tiêm Filler",
        ],
    },
    {
        title: "Phòng Khám",
        items: [
            "Trị mụn",
            "Trị thâm",
            "Trị nám, tàn nhang",
            "Cấy tinh chất",
            "Trẻ hoá da",
        ],
    },
    {
        title: "Nails",
        items: [
            "Sơn móng",
            "Cắt da",
            "Tẩy tế bào chết",
            "Trang trí móng",
            "Chà gót chân",
        ],
    },
];

export function Category() {
    return (
        <div className={styles.category}>
            <Container maxWidth="md">
                <div className={styles.category__list}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.category__item}>
                            <h3>{category.title}</h3>
                            <ul>
                                {category.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <Link to="#">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
