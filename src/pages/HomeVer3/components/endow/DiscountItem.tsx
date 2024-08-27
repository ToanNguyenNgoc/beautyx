import { IDiscountPar, IITEMS_DISCOUNT } from "interface/discount";
import { useHistory } from "react-router-dom";
import { onErrorImg } from "utils";
import { formatDistance } from "utils/format";
import formatPrice from "utils/formatPrice";
import { DISCOUNT_TYPE } from "utils/formatRouterLink/fileType";
import { formatRouterLinkDiscount } from "utils/formatRouterLink/formatRouter";
// ==== api tracking ====
import tracking from "api/trackApi";
import { analytics, logEvent } from "../../../../firebase";
// end
import styles from "./style.module.css"; // Import CSS module
import icon from "constants/icon";

interface IProps {
    discountPar: IDiscountPar;
    discountItem: IITEMS_DISCOUNT;
}

export function DiscountItem(props: IProps) {
    const { discountPar, discountItem } = props;
    const pathDiscountOb = formatRouterLinkDiscount(discountPar, discountItem);
    const history = useHistory();
    const onDetail = () => {
        tracking.DISCOOUNT_ITEM_CLICK(
            discountItem.organization.id,
            "khuyến mãi hot",
            discountItem.discount_id
        );
        logEvent(analytics, "detail_discount", {
            service: discountItem.productable.product_name,
            merchant: discountItem.organization.name,
        });
        history.push(pathDiscountOb);
    };

    const displayDisPrice =
        discountPar.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
            ? discountPar.discount_value
            : discountItem.view_price;
    const displayPrice =
        discountItem.productable?.price ||
        discountItem.productable?.retail_price;
    const percent = Math.round(100 - (displayDisPrice / displayPrice) * 100);

    return (
        <div onClick={onDetail} className={styles["home_discount_item__cnt"]}>
            <div className={styles["discount_item_img_cnt"]}>
                {discountItem.organization.image_url !== "" &&
                    discountItem.organization.image_url !== null && (
                        <img
                            src={discountItem.organization.image_url}
                            onError={(e) => onErrorImg(e)}
                            className={styles["home_discount_item__org_logo"]}
                            alt=""
                        />
                    )}
                <div className={styles["discount_item_percent"]}>
                    -{percent}%
                </div>
                <img
                    alt=""
                    src={
                        discountItem.productable?.image
                            ? discountItem.productable?.image_url
                            : discountItem.organization?.image_url
                    }
                    width="100%"
                    height="100%"
                    className={styles["home_discount_item__img"]}
                    onError={(e) => onErrorImg(e)}
                />
            </div>
            <div className={styles["home_discount_item__detail"]}>
                {discountPar.distance_organization && (
                    <div className={styles["distance"]}>
                        {formatDistance(discountPar.distance_organization)}
                    </div>
                )}
                <h2 className={styles["name"]}>
                    {discountItem.productable?.service_name ||
                        discountItem.productable?.product_name}
                </h2>
                <div className={styles.rating}>
                    <p>4.5</p>
                    <img src={icon.star} alt="" />
                    <p className={styles.rating__count}>
                        <span>(230)</span>
                        <span>&#8226;</span>
                        <span>2K</span> lượt đặt hẹn
                    </p>
                </div>
                <div className={`${styles["flex_column"]} ${styles["price"]}`}>
                    <span className={styles["sale_price"]}>
                        {formatPrice(displayDisPrice)}đ
                    </span>
                    <span className={styles["old_price"]}>
                        {formatPrice(displayPrice)}đ
                    </span>
                </div>
            </div>
        </div>
    );
}
