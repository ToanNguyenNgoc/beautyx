/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import { Banner, Deal, Header, Loading, More, ServiceSection, Tab, About, ChatButton, Staff } from './components';
import { useContext, useRef } from 'react';
import { OrgContext, OrgContextType } from 'context';
import style from './organization.module.css'
import { BackTopButton } from 'components/Layout';
import { useAuth, useDeviceMobile } from 'hooks';
import { usePostAnalytics } from 'pages/Organization/hooks';

function Home() {
  const { load } = useContext(OrgContext) as OrgContextType
  const IS_MB = useDeviceMobile()
  const { USER } = useAuth()
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {
          load ?
            <Container> <Loading /></Container>
            :
            <>
              {IS_MB && <Header />}
              <Container>
                <Banner />
              </Container>
              <Body />
              <More />
              {!IS_MB && <BackTopButton />}
              {USER && <ChatButton />}
            </>
        }
      </div>
    </div>
  );
}
export default Home;
const Body = () => {
  const { org } = useContext(OrgContext) as OrgContextType
  const refDealHot = useRef<HTMLDivElement>(null)
  const refService = useRef<HTMLDivElement>(null)
  const refProduct = useRef<HTMLDivElement>(null)
  const refCombo = useRef<HTMLDivElement>(null)
  const refDetail = useRef<HTMLDivElement>(null)
  const refStaff = useRef<HTMLDivElement>(null)
  usePostAnalytics(org)
  return (
    <>
      <Tab
        refDealHot={refDealHot}
        refService={refService}
        refProduct={refProduct}
        refCombo={refCombo}
        refStaff={refStaff}
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
            <div ref={refProduct} className={style.body_section}>
              <ServiceSection type="PRODUCT" />
            </div>
            <div ref={refCombo} className={style.body_section}>
              <ServiceSection type="COMBO" />
            </div>
            {/* <div ref={refStaff} className={style.body_section}>
              <Staff/>
            </div> */}
          </>
        )}
        <div ref={refDetail} className={style.body_section}>
          <About />
        </div>
      </div>
    </>
  );
}