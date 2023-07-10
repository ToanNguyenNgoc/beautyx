import { XButton } from "components/Layout";
import icon from "constants/icon";
import { IBanner } from "interface";
import Lottie from "lottie-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import animationData from "../../assets/Confetti.json";
import "./style.css";
export default function PortDeal({ banner }: { banner: IBanner }) {
  const sessionShow = !sessionStorage.getItem("show_portal") ? true : false;
  const [showModal, setShowModal] = useState(!!banner && sessionShow);
  const handleHidePortal = () => {
    sessionStorage.setItem("show_portal", JSON.stringify(false));
    setShowModal(false);
  };
  document.body.style.overflow = showModal ? "hidden" : "auto";
  if (!showModal) {
    return null;
  }
  return createPortal(
    <div onClick={handleHidePortal} className="modal">
      <div className="modal-content">
        <div className="lootie">
          <Lottie animationData={animationData} />
        </div>
        <img className="portal-deal-img" src={banner.imageURL} alt="" />
        <div className="lootie2">
          <Lottie animationData={animationData} />
        </div>
        <XButton
          className="modal-deal-btn"
          onClick={handleHidePortal}
          icon={icon.x}
          iconSize={20}
        />
      </div>
    </div>,
    document.body
  );
}
