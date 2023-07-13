import { HomeTitle } from "components/Layout"
import style from "./style.module.css"
import { useQuery } from "@tanstack/react-query"
import { QR_KEY, STALE_TIME } from "config"
import { statisticApi } from "api"
import { useElementOnScreen } from "hooks"
import { useRef } from "react"
import { Avatar } from "@mui/material"
import img from "constants/img"
import { FC } from "react"
import { IOrgMobaGalleries, OrganizationApprove } from "interface"
import { useGalleriesQuery } from "redux-toolkit-query/hook-home"
import { onErrorImg, scrollTop } from "utils"
import { Link } from "react-router-dom"
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter"
import { LoadGrid } from "components/LoadingSketion"

function HomeApprove() {
  const refSection = useRef<HTMLDivElement>(null)
  const isVisible = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  }, refSection)
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.APPROVE],
    queryFn: () => statisticApi.orgsApprove({
      'page': 1, limit: 8
    }),
    enabled: isVisible,
    staleTime: STALE_TIME
  })
  return (
    <div ref={refSection} className={style.container}>
      <HomeTitle title="Doanh nghiệp mới tham gia" />
      <div className={style.list_cnt}>
        {isLoading && <LoadGrid item_count={8} grid={4} />}
        <div className={style.list}>
          {
            data?.context?.data?.map(item => (
              <ApproveItem key={item.id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default HomeApprove

const ApproveItem: FC<{ item: OrganizationApprove }> = ({ item }) => {
  const { data } = useGalleriesQuery(item.organization?.subdomain || '')
  const galleries: IOrgMobaGalleries[] = data ?? []
  return (
    <Link
      onClick={() => scrollTop('auto')}
      to={{ pathname: formatRouterLinkOrg(item.organization.subdomain) }}
      key={item.id} className={style.item}
    >
      <div className={style.item_img}>
        <img
          src={galleries.length > 0 ? galleries[0].image_url : item.organization?.image_url}
          alt=""
          onError={(e) => onErrorImg(e)}
        />
      </div>
      <div className={style.item_cnt}>
        <div className={style.name}>
          <Avatar src={item.organization?.image ? item.organization?.image_url : img.beautyx}
            alt={item.organization?.subdomain}
          />
          <span>{item.organization?.name}</span>
        </div>
        <span className={style.address}>
          {item.organization?.full_address}
        </span>
      </div>
    </Link>
  )
}