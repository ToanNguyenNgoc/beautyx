import { XButton } from "components/Layout";
import icon from "constants/icon";
import { Promotion } from "interface";
import Lottie from "lottie-react";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import animationData from "assets/Confetti.json";
import { Link } from "react-router-dom";
import { slugify } from "utils";
import { useGetPromotionQuery } from "redux-toolkit-query/hook-home";
import style from "./style.module.css"

export default function PortDeal() {
  const { data } = useGetPromotionQuery()
  const promotion = data?.find(i => i.is_popup === 1)
  return promotion ? <Popup promotion={promotion} /> : <></>
}

const Popup: FC<{ promotion: Promotion }> = ({ promotion }) => {
  const sessionShow = !sessionStorage.getItem("show_portal") ? true : false;
  const [showModal, setShowModal] = useState(!!promotion && sessionShow);
  const handleHidePortal = () => {
    sessionStorage.setItem("show_portal", JSON.stringify(false));
    setShowModal(false);
    document.body.style.overflow = "auto";
  };
  document.body.style.overflow = showModal ? "hidden" : "auto";
  if (!showModal) {
    return null;
  }
  return createPortal(
    <div onClick={handleHidePortal} className={style.modal}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setTimeout(() => handleHidePortal(), 100)
        }}
        className={style.modal_content}
      >
        <div className={style.lootie}>
          <Lottie animationData={animationData} />
        </div>
        <Link className={style.link} to={{ pathname: `/deal/${slugify(promotion.name)}` }}>
          <img className={style.portal_deal_img} src={promotion.media_url || ''} alt="" />
        </Link>
        <div className={style.lootie2}>
          <Lottie animationData={animationData} />
        </div>
        <XButton
          className={style.modal_deal_btn}
          onClick={handleHidePortal}
          icon={icon.x}
          iconSize={20}
        />
      </div>
    </div>,
    document.body
  );
}