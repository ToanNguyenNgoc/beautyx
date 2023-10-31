import { XButton } from "components/Layout";
import icon from "constants/icon";
import { Promotion } from "interface";
import Lottie from "lottie-react";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import animationData from "assets/Confetti.json";
import { Link } from "react-router-dom";
import { slugify } from "utils";
import style from "./style.module.css"
import { usePromotion } from "hooks";

export default function PortDeal() {
  const { data } = usePromotion()
  const promotions = data?.filter(i => i.is_popup === 1)
  return promotions.length > 0 ? <Popup promotions={promotions} /> : <></>
}

const Popup: FC<{ promotions: Promotion[] }> = ({ promotions }) => {
  const listHidden: number[] = sessionStorage.getItem('list_hidden') ?
    JSON.parse(String(sessionStorage.getItem('list_hidden'))) : []
  const listShow = promotions.filter(i => !listHidden.includes(i.id))
  const [showModal, setShowModal] = useState(listShow.length > 0);
  document.body.style.overflow = showModal ? "hidden" : "auto";
  if (!showModal) {
    return null;
  }
  const promotion = listShow.length > 0 ? listShow[0] : null
  const handleHidePortal = () => {
    const newListHidden = [...listHidden, promotion?.id]
    sessionStorage.setItem('list_hidden', JSON.stringify(newListHidden))
    setShowModal(false)
  }
  return createPortal(
    <div
      onClick={handleHidePortal}
      className={style.modal}
    >
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
        <Link className={style.link} to={{ pathname: `/deal/${slugify(promotion?.name)}` }}>
          <img className={style.portal_deal_img} src={promotion?.media_url || ''} alt="" />
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