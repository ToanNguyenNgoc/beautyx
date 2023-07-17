/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useHistory } from "react-router-dom";
import {
    useDeviceMobile,
} from "hooks";
import { slugify } from "utils";
import { Container } from "@mui/system";
import { IDiscountPar, IITEMS_DISCOUNT } from "interface";
import { ProductableItem, Seo } from "components/Layout";
import { LoadGrid } from "components/LoadingSketion";
import style from "./deal.module.css"
import { useGetPromotionQuery } from "redux-toolkit-query/hook-home";
import { useQuery } from "@tanstack/react-query";
import { promotionApi } from "api";
import { QR_KEY, STALE_TIME } from "config";
import HeadMobile from "features/HeadMobile";
import DiscountItem from "pages/HomePage/HomeDiscounts/DiscountItem";

function DealBanner() {
    const params = useParams()
    const { data: dataList } = useGetPromotionQuery()
    const mb = useDeviceMobile()
    const promotion = dataList?.find(i => slugify(i.name) === params._id)
    const history = useHistory()
    const { data, isLoading } = useQuery({
        queryKey: [QR_KEY.PROMOTION, promotion?.id],
        queryFn: () => promotionApi.promotion(promotion?.id || 0),
        enabled: promotion ? true : false,
        onError: () => history.replace("/error"),
        staleTime: STALE_TIME
    })
    const detail = data?.context
    return (
        <>
            <Seo title={data?.context?.name || 'Đang tải...'} />
            {mb && <HeadMobile title={data?.context?.name || 'Đang tải...'} />}
            <Container>
                <div className={style.body}>
                    <div className={style.image_thumbnail}>
                        <img src={detail?.is_popup === 1 ? detail?.thumbnail : detail?.imageURL} alt="" />
                    </div>
                    <div className={style.list}>
                        {
                            detail?.discounts.map((discount: IDiscountPar, index: number) => (
                                <div key={index}>
                                    {
                                        discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
                                            <DiscountItem
                                                key={i}
                                                discountItem={item}
                                                discountPar={discount}
                                            />
                                        ))
                                    }
                                </div>
                            ))
                        }
                        {
                            detail?.productables?.map(item => (
                                <ProductableItem key={item.id} productable={item} />
                            ))
                        }
                    </div>
                    {isLoading && <LoadGrid item_count={10} grid={mb ? 2 : 5} />}
                </div>
            </Container>
        </>
    )
}
export default DealBanner
