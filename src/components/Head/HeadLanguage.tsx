import img from "constants/img";
import { AppContext } from "context";
import i18next from "i18next";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import style from "./head.module.css";

function HeadLanguage() {
  const refLanguage = useRef<HTMLDivElement>();
  const [flagIMG, setflagIMG] = useState<string>(img.flagVN);
  const onToggleLanguage = (dis: "show" | "hide") => {
    if (dis === "show")
      return refLanguage?.current?.classList.add(style.head_menu_show);
    if (dis === "hide")
      return refLanguage?.current?.classList.remove(style.head_menu_show);
  };
  return (
    <button
      onClick={() => onToggleLanguage("show")}
      onFocus={() => onToggleLanguage("show")}
      onBlur={() => onToggleLanguage("hide")}
      className={style.bth_language}
    >
      <HeadMenuBox
        setflagIMG={setflagIMG}
        refLanguage={refLanguage}
        onToggleLanguage={onToggleLanguage}
        flagIMG={flagIMG}
      />
      <img src={flagIMG} alt="flag" />
    </button>
  );
}

export default HeadLanguage;


interface HeadMenuProps {
  refLanguage: any;
  setflagIMG: Dispatch<SetStateAction<string>>;
  onToggleLanguage: (dis: "show" | "hide") => void;
  flagIMG: string;
}

const HeadMenuBox = (props: HeadMenuProps) => {
  const { refLanguage, setflagIMG, onToggleLanguage, flagIMG } =
    props;
  const { setLanguage } = useContext(AppContext) as any;

  const handleChangeLang = (code: string) => {
    setLanguage(code);
    i18next.changeLanguage(code);
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={refLanguage}
      className={style.head_langage}
    >
      <ul className={style.menu_lang}>
        <li
          onClick={() => {
            setflagIMG(img.flagVN);
            onToggleLanguage("hide");
            handleChangeLang("vn");
          }}
          className={style.menu_lang_item}
        >
          <img src={img.flagVN} alt="" />
          <p style={flagIMG === img.flagVN ? { color: "#62bd19" } : {}}>VI</p>
        </li>
        <li
          onClick={() => {
            setflagIMG(img.flagUK);
            onToggleLanguage("hide");
            handleChangeLang("en");
          }}
          className={style.menu_lang_item}
        >
          <img src={img.flagUK} alt="" />
          <p style={flagIMG === img.flagUK ? { color: "#62bd19" } : {}}>EN</p>
        </li>
      </ul>
    </div>
  );
};