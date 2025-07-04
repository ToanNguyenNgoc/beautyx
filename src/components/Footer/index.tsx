import React, { useContext, useState } from "react";
import "./footer.css";
import { Container } from "@mui/material";
import slugify from "utils/formatUrlString";
import img, { paymentMethod, social } from "constants/img";
import icon from "constants/icon";
import { AppContext } from "context/AppProvider";
import dayjs from 'dayjs';
import {
  phoneSupport,
  mailSales,
  mailSupport,
  phoneHotline,
} from "constants/index";
import { formatPhoneNumber } from "utils";
import { PopupNotification } from "components/Notification";
import { Link, useLocation } from "react-router-dom";

const pathsHide = ["messages", "cong-dong", "xu-huong"]

function Footer() {
  const url_map = `https://www.google.com/maps/@10.7965948,106.702991`;
  const { t } = useContext(AppContext) as any;
  const [openPopup, setOpenPopup] = useState({
    open: false,
    content: '',
    child: <></>
  })
  const location = useLocation()
  const currRoute = location.pathname.split("/")[1]
  const show = !pathsHide.includes(currRoute)
  const data_footer = [
    {
      id: 1,
      title: `${t("footer.customer_support")}`,
      items: [
        {
          id: 11,
          title: `${t("footer.consultation_call_center")}:  ${formatPhoneNumber(
            phoneHotline
          )}`,
          type: "NUMBER",
          url: `${phoneHotline}`,
        },
        {
          id: 12,
          title: `${t(
            "footer.customer_care_call_center"
          )} : ${formatPhoneNumber(phoneSupport)}`,
          type: "NUMBER",
          url: `${phoneSupport}`,
        },
        {
          id: 13,
          title: `${mailSales}`,
          type: "EMAIL",
          url: `${mailSales}`,
        },
        {
          id: 14,
          title: `${mailSupport}`,
          type: "EMAIL",
          url: `${mailSupport}`,
        },
        {
          id: 15,
          title: `${t("footer.privacy_policy")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 16,
          title: `${t("footer.return_and_refund")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 17,
          title: `${t("footer.protect_the_interests_of_customers")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 18,
          title: `${t("footer.acceptable_resolution_mechanism")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 19,
          title: `Tiếp nhận phản ánh của Tổ chức xã hội`,
          type: "REFLECT",
          url: "/",
        },
        {
          id: 20,
          title: `Danh sách phản ánh của Tổ chức xã hội`,
          type: "REFLECT",
          url: "/list",
        },
      ],
    },
    {
      id: 2,
      title: `${t("footer.myspa_company")}`,
      items: [
        {
          id: 20,
          title: `${t("footer.operating_regulations")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 21,
          title: `${t("footer.general_rules")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 22,
          title: `${t("footer.commodity_trading_regulations")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 23,
          title: `${t("footer.payment_process")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 24,
          title: `${t("footer.secure_transaction")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 26,
          title: `${t("footer.responsibility")}`,
          type: "URL",
          url: "/",
        },
        {
          id: 27,
          title: `${t("footer.terms_and_commitments")}`,
          type: "URL",
          url: "/",
        },
      ],
    },
  ];
  const social_list: any = [
    {
      id: 1,
      img: social.facebook,
      type: "SOCIAL",
      url: "https://www.facebook.com/beautyxdatlichlamdep/",
    },
    {
      id: 2,
      img: social.instagram,
      type: "SOCIAL",
      url: "https://www.instagram.com/myspa.vn_phanmemquanlyspa/",
    },
    {
      id: 3,
      img: social.tiktok,
      type: "SOCIAL",
      url: "https://www.tiktok.com/@beautyx.vn",
    },
    {
      id: 4,
      img: social.youtube,
      type: "SOCIAL",
      url: "https://www.youtube.com/channel/UCAWXbDX56x8OhJyA1cjIFRA",
    },
  ];
  const downList = [
    {
      id: 1,
      type: "DOWN",
      img: img.playStore,
      url: "https://play.google.com/store/apps/details?id=com.myspa.beautyx",
    },
    {
      id: 2,
      type: "DOWN",
      img: img.appStore,
      url: "https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi",
    },
  ];
  const payment = [
    // {
    //     id: 1,
    //     img: paymentMethod.tikiPay,
    // },
    {
      id: 2,
      img: paymentMethod.visa,
    },
    {
      id: 3,
      img: paymentMethod.masterCard,
    },
    {
      id: 4,
      img: paymentMethod.jcb,
    },
    {
      id: 5,
      img: paymentMethod.atm,
    },
    {
      id: 6,
      img: paymentMethod.momoPayment,
    },
    // {
    //     id: 7,
    //     img: paymentMethod.zaloPay,
    // },
    // {
    //     id: 8,
    //     img: paymentMethod.mocaGrap,
    // },
    // {
    //     id: 9,
    //     img: paymentMethod.phonePay,
    // },
    // {
    //     id: 10,
    //     img: paymentMethod.vnPay,
    // },
    {
      id: 11,
      img: paymentMethod.handPay,
    },
    {
      id: 12,
      img: icon.payon,
    },
    {
      id: 13,
      img: paymentMethod.viettel,
    },
  ];
  const app = [
    {
      id: 1,
      img: icon.momo,
      type: "APP",
      url: process.env.REACT_APP_DEEP_LINK_MOMO,
      qrCode: img.qrCodeMomo
    },
    {
      id: 2,
      img: paymentMethod.tikiPay,
      type: "APP",
      url: process.env.REACT_APP_DEEP_LINK_TIKI,
      qrCode: img.qrCodeTiki
    },
    {
      id: 3,
      img: icon.zalo,
      type: "APP",
      url: process.env.REACT_APP_DEEP_LINK_ZALO,
      qrCode: img.qrCodeZalo
    },
  ];

  const dataMyspa = [
    {
      id: 1,
      link: "https://myspa.vn/phan-mem-quan-ly-spa",
      text: `${t("footer.manager_spa")}`,
    },
    {
      id: 2,
      link: "https://myspa.vn/phan-mem-quan-ly-phong-kham",
      text: `${t("footer.manager_clinic")}`,
    },
    {
      id: 3,
      link: "https://myspa.vn/phan-mem-quan-ly-salon-toc",
      text: `${t("footer.manager_salon")}`,
    },
    {
      id: 4,
      link: "https://myspa.vn/phan-mem-quan-ly-tiem-nails",
      text: `${t("footer.manager_nail")}`,
    },
    {
      id: 5,
      link: "https://myspa.vn/thiet-ke-app-thuong-hieu",
      text: `${t("footer.manager_brandapp")}`,
    },
    {
      id: 6,
      link: "https://myspa.vn/thiet-ke-zalo-mini-app-thuong-hieu",
      text: `${t("footer.manager_miniapp")}`,
    },
    {
      id: 7,
      link: "https://myspa.vn/mini-game-vong-quay-may-man",
      text: "Lucky Wheel",
    },
    {
      id: 8,
      link: "https://myspa.vn/marketing-automation-zns",
      text: "Marketing Automation ZNS",
    },
  ];

  const voucherInApp = [
    {
      id: 1,
      img: img.iconShoppee,
    },
    {
      id: 2,
      img: img.oneU,
    },
    {
      id: 3,
      img: icon.momo,
    },
    {
      id: 4,
      img: paymentMethod.tikiPay,
    },
    {
      id: 5,
      img: img.beautyx,
    },
    {
      id: 6,
      img: icon.zalo,
    }
  ];
  const gotoMyspa = (link: string) => {
    window.open(
      `${link}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const gotoPolicy = (item: any) => {
    switch (item.type) {
      case "NUMBER":
        return window.open(`tel:${item.url}`, "_seft");
      case "EMAIL":
        return window.open(`mailto:${item.url}`);
      case "REFLECT":
        return window.open(
          `/phan-anh-to-chuc-xa-hoi${item.url}`,
          "_blank",
          "noopener,noreferrer"
        );
      case "URL":
        // return history.push({
        //     pathname: `/chinh-sach/${slugify(item.title)}?id=${item.id}`,
        //     state: item,
        // });
        return window.open(
          `/chinh-sach/${slugify(item.title)}?id=${item.id}`,
          "_blank",
          "noopener,noreferrer"
        );
      case "SOCIAL":
        return window.open(
          `${item.url}`,
          "_blank",
          "noopener,noreferrer"
        );
      case "DOWN":
        return window.open(
          `${item.url}`,
          "_blank",
          "noopener,noreferrer"
        );
      case "APP":
        return setOpenPopup({
          open: true,
          content: '',
          child: <div className="footer-pop-child">
            <div className="footer-pop-child-title">
              <span>Trải nghiệm BeautyX trên ứng dụng</span>
              <img src={item.img} alt="" />
            </div>
            <img src={item.qrCode} alt="" className="footer-pop-child-qr-code" />
          </div>
        })
      default:
        break;
    }
  };
  // const paramsArr = useGetParamUrl();
  // const params = {
  //     org: parseInt(paramsArr[1]),
  //     id: parseInt(paramsArr[0])
  // }
  // const linl = `https://beautyx.page.link/?link=https://beautyx.page.link/myspa?service%3D${params.id}%26merchant%3D${params.org}&apn=com.myspa.beautyx&amv=18&isi=1614767784&ibi=com.myspa.beautyx&imv=18&cid=3028181755793109443&_osl=https://beautyx.page.link/MoBKVqvvHTrirbCG6&_icp=1`
  // const [link, setLink] = useState('')
  // useEffect(()=>{
  //     setLink(`https://beautyx.page.link/?link=https://beautyx.page.link/myspa?service%3D${params.id}%26merchant%3D${params.org}&apn=com.myspa.beautyx&amv=18&isi=1614767784&ibi=com.myspa.beautyx&imv=18&cid=3028181755793109443&_osl=https://beautyx.page.link/MoBKVqvvHTrirbCG6&_icp=1`)
  // },[params.id, params.org])
  if (window.location.pathname === "/home-ver3" || window.location.pathname === "/about") {
    return <></>
  }

  return show ? (
    <div className="footer">
      <PopupNotification
        title="Quét mã QR"
        open={openPopup.open}
        setOpen={() => setOpenPopup({ ...openPopup, open: false })}
        content={openPopup.content}
        children={openPopup.child}
      />
      <Container>
        <div className="footer-cnt">
          <div className="footer-left">
            <div className="footer-left_top">
              {data_footer.map((item, index) => (
                <div key={index} className="wrap">
                  <div className="footer-cnt__item">
                    <div className="footer-cnt__item-title">{item.title}</div>
                    <ul>
                      {item.items.map((item: any, i: number) => (
                        <li onClick={() => gotoPolicy(item)} key={i}>
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="footer-left_bottom">
              <div className="wrap">
                <div className="footer-cnt__item">
                  <div className="row-center">
                    <div className="footer-cnt__item-title">{t("footer.product_of_myspa")}</div>
                    <img onClick={() => gotoMyspa("https://myspa.vn/")} className="logo-myspa" alt="logo-myspa" src={img.logoMyspaWhite} />
                  </div>
                  <ul>
                    {dataMyspa.map((item: any, index: number) => (
                      <li key={index} onClick={() => gotoMyspa(item.link)}>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className="footer-right">
            <div className="wrap">
              <>
                <div className="footer-cnt__item-title">
                  {t("footer.payment_method")}
                </div>
                <div style={{ marginTop: "16px" }} className="social-list">
                  {payment.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="social-item__method social-item"
                    >
                      <div className="social-item__img">
                        <img src={item.img} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{ marginTop: "24px" }}
                  className="footer-cnt__item-title"
                >
                  {t("footer.beautyx_is_on")}
                </div>
                <div className="social-list">
                  <div className="flexX-gap-16">
                    {app.map((item: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => gotoPolicy(item)}
                        className="social-item__img cursor-pointer"
                      >
                        <img src={item.img} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{ marginTop: "16px" }}
                  className="footer-cnt__item-title"
                >
                  {t("footer.voucher_in_app")}
                </div>
                <div className="social-list">
                  <div className="flexX-gap-16">
                    {voucherInApp.map((item: any, index: number) => (
                      <div key={index} className="social-item__img">
                        <img
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                          }}
                          src={item.img}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </div>
            <div className="wrap">
              <>
                <div className="footer-cnt__item-title">
                  {t("footer.contact_width_me")}
                </div>
                <div className="social-list">
                  {social_list.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => gotoPolicy(item)}
                      className="social-item"
                    >
                      <div className="social-item__img">
                        <img src={item.img} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{ marginTop: "24px" }}
                  className="footer-cnt__item-title"
                >
                  {t("footer.download_app")}
                </div>
                <div className="down-app">
                  <div className="down-app__qr">
                    <img src={img.qrCode} alt="" />
                  </div>
                  <div className="down-app__wrap">
                    {downList.map((item: any, index: number) => (
                      <div key={index} className="down-app__btn">
                        <img
                          onClick={() => gotoPolicy(item)}
                          src={item.img}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aws_starups" style={{marginTop:'24px'}}>
                  <a target="blank" href="http://online.gov.vn/Home/WebDetails/130293" className="aws_startups_img">
                    <img style={{ borderRadius: '6px' }} src={img.bct} alt="" />
                  </a>
                </div>
              </>
            </div>
          </div>
        </div>

        {/* <div className="aws_starups">
          <a target="blank" href="http://online.gov.vn/Home/WebDetails/130293" className="aws_startups_img">
            <img style={{borderRadius:'6px'}} src={img.bct} alt="" />
          </a>
        </div> */}

        <div
          className="address"
          onClick={() =>
            window.open(`${url_map}`, "_blank", "noopener,noreferrer")
          }
        >
          {t("footer.address_company")} <br />
          {t("footer.address_company_2")}
        </div>
        <div className="footer-copy-right">{t("footer.policy")}</div>
        <div className="footer-copy-right">
          © {dayjs().year()} Copyright BeautyX | ProductX team.
        </div>
      </Container>
    </div>
  ) : (
    <></>
  );
}

export default Footer;
