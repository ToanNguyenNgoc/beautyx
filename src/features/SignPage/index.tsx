import React, { useContext, useState } from "react";
import img from "../../constants/img";
import icon from "../../constants/icon";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AppContext } from "../../context/AppProvider";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";

function SignPage(props: any) {
  const { t } = useContext(AppContext);
  const location = useLocation();
  const [activeTabSign, setActiveTabSign] = useState(
    location.search ?
      parseInt(location.search.slice(1, location.search.length))
      :
      1);
  const buttons = [
    { id: 1, title: t("Home.Sign_in") },
    { id: 2, title: t("Home.Sign_up") },
  ];
  const chooseTab = (id: any) => {
    setActiveTabSign(id);
  };
  return (
    <>
      <BackButton />
      <div className="page-sign">
        <Container>
          <div className="flex-row-sp sign-content page-sign__cnt">
            <img
              src={icon.Logo}
              alt=""
              className="sign-content__left-logo-mb"
            />
            <div
              className="flex-column sign-content__left"
              style={{ justifyContent: "center" }}
            >
              <img className="sign-content__left-logo" src={icon.Logo} alt="" />
              <img
                className="sign-content__left-partner"
                src={img.Partner}
                alt=""
              />
            </div>
            <div className="sign-content__right">
              <div className="sign-content__right-tab">
                {buttons.map((item) => (
                  <button
                    onClick={() => chooseTab(item.id)}
                    style={
                      item.id === activeTabSign
                        ? {
                            color: "var(--purple)",
                            borderBottom: "solid 1px var(--purple)",
                          }
                        : {}
                    }
                    key={item.id}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <SignIn
                // setOpenSignIn={setOpenSignIn}
                activeTabSign={activeTabSign}
                setActiveTabSign={setActiveTabSign}
                t={t}
              />
              <SignUp 
              activeTabSign={activeTabSign} 
              setActiveTabSign={setActiveTabSign}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SignPage;
