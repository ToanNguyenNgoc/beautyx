/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import { Banner, Deal, Header, Loading, More, ServiceSection, Tab, About, ChatButton } from "./components";
import { Fragment, useContext, useRef } from "react";
import { OrgContext, OrgContextType } from "context";
import style from "./organization.module.css";
import { BackTopButton, OrgOffLayout } from "components/Layout";
import { useAuth, useDeviceMobile } from "hooks";
import { usePostAnalytics } from "pages/Organization/hooks";

function Home() {
  const { load, org } = useContext(OrgContext) as OrgContextType;
  const IS_MB = useDeviceMobile();
  const { USER } = useAuth();
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {(load) ? (
          <Container>
            {" "}
            <Loading />
          </Container>
        ) : (
          <>
            {IS_MB && <Header />}
            {
              org.is_momo_ecommerce_enable ?
                <Fragment>
                  <Container>
                    <Banner />
                  </Container>
                  <Body />
                  <More />
                  {!IS_MB && <BackTopButton />}
                  {USER && <ChatButton />}
                </Fragment>
                :
                <OrgOffLayout />
            }
          </>
        )}
      </div>
    </div>
  );
}
export default Home;
const Body = () => {
  const { org } = useContext(OrgContext) as OrgContextType;
  const refDealHot = useRef<HTMLDivElement>(null);
  const refService = useRef<HTMLDivElement>(null);
  const refProduct = useRef<HTMLDivElement>(null);
  const refCombo = useRef<HTMLDivElement>(null);
  const refDetail = useRef<HTMLDivElement>(null);
  usePostAnalytics(org);
  return (
    <>
      <Tab
        refDealHot={refDealHot}
        refService={refService}
        refProduct={refProduct}
        refCombo={refCombo}
        refDetail={refDetail}
      />
      <div className={style.body}>
        {org.is_momo_ecommerce_enable && (
          <>
            <div ref={refDealHot} className={style.body_section}>
              <Deal />
            </div>
            <div ref={refService} className={style.body_section}>
              <ServiceSection type="SERVICE" />
            </div>
            {/* <div ref={refProduct} className={style.body_section}>
              <ServiceSection type="PRODUCT" />
            </div> */}
            <div ref={refCombo} className={style.body_section}>
              <ServiceSection type="COMBO" />
            </div>
          </>
        )}
        {
          org?.is_momo_ecommerce_enable ?
            <div ref={refDetail} className={style.body_section}>
              <About />
            </div>
            :
            null
        }
      </div>
    </>
  );
};
