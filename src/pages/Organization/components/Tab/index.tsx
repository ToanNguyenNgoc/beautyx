/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useContext, useEffect, useState } from "react";
import style from "../../organization.module.css";
import { AppContext, AppContextType } from "context/AppProvider";
import { OrgContext, OrgContextType } from "context";
import { Container, useMediaQuery } from "@mui/material";
import animationData from "../../../../assets/reviewSVG.json";
import Lottie from "lottie-react";
interface TabProps {
  refDealHot: RefObject<HTMLDivElement>;
  refService: RefObject<HTMLDivElement>;
  refProduct: RefObject<HTMLDivElement>;
  refCombo: RefObject<HTMLDivElement>;
  refDetail: RefObject<HTMLDivElement>;
}

export const Tab = ({
  refDealHot,
  refService,
  refProduct,
  refCombo,
  refDetail
}: TabProps) => {
  const { t } = useContext(AppContext) as AppContextType;
  const { org, trends, staffs } = useContext(OrgContext) as OrgContextType;
  const [tabAct, setTabAct] = useState(0);
  const mrTop =  84;
  let tabs = [
    {
      open: org?.is_momo_ecommerce_enable,
      id: 1,
      title: "Deal Hot",
      path: "deal-hot",
      ref: refDealHot,
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 2,
      title: t("Mer_de.services"),
      path: "dich-vu",
      ref: refService,
    },
    // {
    //   open: org?.is_momo_ecommerce_enable,
    //   id: 3,
    //   title: t("Mer_de.products"),
    //   path: "san-pham",
    //   ref: refProduct,
    // },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 4,
      title: "Combo",
      path: "combo",
      ref: refCombo,
    },
    {
      open: true,
      id: 5,
      title: t("pr.merchant_detail"),
      path: "thong-tin",
      ref: refDetail,
    },
    {
      open: staffs.length > 0 ? true : false,
      id: 6,
      title: t("Mer_de.staff"),
      path: "nhan-vien",
      ref: refDetail,
    },
    {
      open: trends.length > 0 ? true : false,
      id: 7,
      title: "Review",
      path: "review",
      ref: refDetail,
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (
        refDealHot.current &&
        refService.current &&
        refProduct.current &&
        refCombo.current &&
        refDetail.current
      ) {
        const scrollY = window.scrollY + 90;
        const dealHotOffset = refDealHot.current.offsetTop;
        const serviceOffset = refService.current.offsetTop;
        const productOffset = refProduct.current.offsetTop;
        const comboOffset = refCombo.current.offsetTop;
        const detailOffset = refDetail.current.offsetTop;
        if (scrollY < 500) {
          setTabAct(0);
        } else if (dealHotOffset < scrollY && scrollY < serviceOffset) {
          setTabAct(1);
        } else if (serviceOffset < scrollY && scrollY < productOffset) {
          setTabAct(2);
        } else if (productOffset < scrollY && scrollY < comboOffset) {
          setTabAct(3);
        } else if (comboOffset < scrollY && scrollY < detailOffset) {
          setTabAct(4);
        } else if (detailOffset < scrollY) {
          setTabAct(5);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={style.tab_wrapper}>
      <Container>
        <div className={style.tab_cnt}>
          {tabs
            .filter((tab) => tab.open === true)
            .map((tab) => (
              <div
                key={tab.path}
                className={
                  tab.id === tabAct
                    ? `${style.tab_item} ${style.tab_item_act}`
                    : style.tab_item
                }
                onClick={() =>
                  tab.ref.current &&
                  window.scrollTo({
                    top: tab.ref?.current.offsetTop - mrTop,
                    behavior: "smooth",
                  })
                }
              >
                {tab.id === 7 ? (
                  <div className={style.cus_title_review}>
                    <p className={style.tab_item_review}>{tab.title}</p>
                    <div className={style.icon_review}>
                      <Lottie animationData={animationData} />
                    </div>
                  </div>
                ) : (
                  <p>{tab.title}</p>
                )}
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};
