import { ProductableGroup } from "hooks";
import { FC } from "react";
import style from './productable-item-group.module.css'
import { onErrorImg } from "utils";
import { Link } from "react-router-dom";
import { useGalleriesQuery } from "redux-toolkit-query/hook-home";
import { IOrgMobaGalleries } from "interface";
import { ProductableItem } from "../ProductableItem";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";

import { Distance } from "../Distance/Distance";

interface ProductableItemGroupProps {
  item: ProductableGroup
}

export const ProductableItemGroup: FC<ProductableItemGroupProps> = ({
  item
}) => {
  const { data } = useGalleriesQuery(item.organization.subdomain)
  const galleries: IOrgMobaGalleries[] = data ?? []
  let image_url = item.organization.image_url
  if (galleries.length > 0) {
    image_url = galleries[0].image_url
  }
  return (
    <div className={style.container}>
      <Link className={style.containerOrg} to={{ pathname: formatRouterLinkOrg(item.organization.subdomain) }}>
        <div className={style.containerOrgImg}>
          <img src={image_url} onError={onErrorImg} alt="" />
        </div>
        <div className={style.containerOrgDetail}>
          <span className={style.containerOrgDetailName}>
            <img src={item.organization.image_url} alt="" />
            {item.organization.name}
          </span>
          <p className={style.containerOrgAddress}>
            {item.organization.full_address}
          </p>
          <Distance lat={item.organization.latitude} long={item.organization.longitude}/>
        </div>
      </Link>
      <div className={style.containerProductable}>
        <ul className={style.containerProductList}>
          <p className={style.containerProductLabel}>Dịch vụ</p>
          {
            item.productables.slice(0, 3).map(productable => (
              <li key={productable.id} className={style.containerProductItem}>
                <ProductableItem productable={productable} changeStyle />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

