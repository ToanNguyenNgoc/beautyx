import { Container } from "@mui/material";
import { IDiscountPar, IITEMS_DISCOUNT } from "interface";
import { useDeviceMobile } from "hooks";
import { Link } from "react-router-dom";
import scrollTop from "utils/scrollTop";
import { FC, useContext } from "react";
import { AppContext } from "context/AppProvider";
import { LoadGrid } from "components/LoadingSketion";
import { DISCOUNT_TYPE } from "utils/formatRouterLink/fileType";
import { AUTH_LOCATION } from "api/authLocation";
import { paramsDiscounts } from "params-query";
import styles from "./style.module.css";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { STALE_TIME, baseURL } from "config";
import { identity, pickBy } from "lodash";
import { DiscountItem } from "pages/HomeVer3/components/endow/DiscountItem";

export const Endow: FC = () => {
    const { t } = useContext(AppContext) as any;
    const IS_MB = useDeviceMobile();
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const LOCATION = AUTH_LOCATION();
    const newParams = {
        ...paramsDiscounts,
        limit: 15,
        "filter[location]": PLAT_FORM === "TIKI" ? "" : LOCATION,
        sort: PLAT_FORM === "TIKI" ? "-priority" : "",
    };
    const { data } = useInfiniteQuery({
        queryKey: ["DISCOUNTS", newParams],
        queryFn: ({ pageParam = 1 }) =>
            axios
                .get(`${baseURL}discounts`, {
                    params: pickBy({ ...newParams, page: pageParam }, identity),
                })
                .then((res) => res.data.context),
        getNextPageParam: (page: any) => {},
        staleTime: STALE_TIME,
    });
    const discounts: IDiscountPar[] =
        data?.pages.map((i) => i.data).flat() ?? [];
    return (
        <div className={styles["home_discounts"]}>
            <Container maxWidth="md">
                <div
                    className={`flex-row-sp ${styles["home_discounts_title"]}`}
                >
                    <h2>Ưu đãi HOT</h2>
                    <Link
                        onClick={() => scrollTop("auto")}
                        to={{ pathname: "/giam-gia" }}
                    >
                        Xem tất cả
                    </Link>
                </div>
                <div className={styles["home_discounts_list_wrap"]}>
                    {discounts.length === 0 && (
                        <LoadGrid item_count={5} grid={5} />
                    )}
                    <ul className={styles["home_discounts_list"]}>
                        {discounts
                            ?.filter(
                                (i: IDiscountPar) =>
                                    i.items.length > 0 &&
                                    (i.discount_type ===
                                        DISCOUNT_TYPE.PRODUCT.key ||
                                        i.discount_type ===
                                            DISCOUNT_TYPE.FINAL_PRICE.key)
                            )
                            ?.slice(0, !IS_MB ? 5 : 10)
                            ?.map((discount: IDiscountPar, index: number) => (
                                <div key={index}>
                                    {discount.items.map(
                                        (item: IITEMS_DISCOUNT, i: number) => (
                                            <li key={i}>
                                                <DiscountItem
                                                    discountItem={item}
                                                    discountPar={discount}
                                                />
                                            </li>
                                        )
                                    )}
                                </div>
                            ))}
                    </ul>
                </div>
            </Container>
        </div>
    );
};
export * from "./DiscountItem";
