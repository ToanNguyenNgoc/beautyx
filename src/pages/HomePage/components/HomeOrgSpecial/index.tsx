import { FC } from "react";
import style from "./org-special.module.css"
import { useSwr } from "hooks";
import API_ROUTE from "api/_api";
import { CACHE_TIME } from "common";
import { IOrganization } from "interface";
import { Container, useMediaQuery } from "@mui/material";
import Slider, { Settings } from "react-slick";
import { Link } from "react-router-dom";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";
import { scrollTop } from "utils";
import { LoadGrid } from "components/LoadingSketion";

export const HomeOrgSpecial: FC = () => {
  const mb = useMediaQuery('(max-width:767px)')
  const { responseArray } = useSwr({
    API_URL: API_ROUTE.ORGS,
    params: { 'limit': 8, 'filter[is_momo_ecommerce_enable]': true, 'sort': '-priority' },
    enable: true,
    dedupingInterval: CACHE_TIME
  })
  const orgs: IOrganization[] = responseArray || []
  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: mb ? 500 : 90000,
    // autoplay: true,
    autoplaySpeed: 0,
    slidesToShow: 8,
    slidesToScroll: 8,
    draggable: true
  }
  return (
    <div className={style.container}>
      <Container>
        <div className={style.title}>
          <h2>Thương hiệu nổi bật</h2>
        </div>
        {orgs.length === 0 && <LoadGrid className={style.load} grid={8} item_count={8} />}
        <Slider {...settings}>
          {
            orgs.map(item => (
              <Link onClick={() => scrollTop('auto')} className={style.org_item}
                key={item.id} to={{ pathname: formatRouterLinkOrg(item.subdomain) }}
              >
                <div className={style.org_avatar}>
                  <img src={item.image_url} alt="" />
                </div>
              </Link>
            ))
          }
        </Slider>
      </Container>
    </div>
  )
}