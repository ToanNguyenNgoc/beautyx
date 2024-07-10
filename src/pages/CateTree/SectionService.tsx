import { AUTH_LOCATION } from 'api/authLocation';
import { API_ROUTE_V } from 'api/_api';
import { ProductableItem } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import { useDeviceMobile, useFetchInfinite } from 'hooks';
import { ITag, Productable } from 'interface';
import { paramsProductable } from 'params-query';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formatRouterLinkService, navigateSearchResult } from 'utils/formatRouterLink/formatRouter';
import style from './cate-tree.module.css'
import img from 'constants/img';
import { formatDistance, onErrorImg } from 'utils';
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import icon from 'constants/icon';

function SectionService({ tagChild }: { tagChild?: ITag }) {
  const LOCATION = AUTH_LOCATION()
  const history = useHistory()
  const IS_MB = useDeviceMobile()
  const { resDataV2, isValidating } = useFetchInfinite(
    tagChild,
    API_ROUTE_V.PRODUCTABLE('v3'),
    {
      ...paramsProductable,
      keyword: tagChild?.name,
      type: 1,
      // location: LOCATION,
      sort: 'location'
    }
  )
  return (
    <div className={style.services_cnt}>
      <p className={style.product_child_child_labe}>
        Dịch vụ
        <span
          onClick={() => history.push(navigateSearchResult('SERVICE', tagChild?.name ?? ''))}
        >Xem thêm</span>
      </p>
      <ul className={style.service_list}>
        {
          resDataV2?.map((productable: Productable, index: number) => (
            <li key={index} className={style.service_list_item}>
              {/* <ProductableItem productable={productable} changeStyle /> */}
              <ServiceItem productable={productable} />
            </li>
          ))
        }
      </ul>
      {(isValidating && resDataV2?.length === 0)
        && <LoadGrid grid={IS_MB ? 1 : 5} item_count={15} />}
    </div>
  );
}

const ServiceItem: FC<{ productable: Productable }> = ({
  productable
}) => {
  let LINK_DETAIL = formatRouterLinkService(
    productable?.origin_id,
    productable?.organization_id,
    productable?.name
  );
  const org = (productable.organization?.length > 0 ? productable?.organization[0] : undefined);
  let image_url = org?.image_url || img.imgDefault;
  if (productable.media?.length > 0) {
    image_url = productable.media[0]?.original_url;
  }
  const special_price = formatSalePriceService(
    productable?.discount_price,
    productable?.discount_ecommerce_price
  );
  return (
    <Link to={{ pathname: LINK_DETAIL }} className={style.service_item_cnt}>
      <img
        src={image_url} alt=""
        className={style.service_item_img}
        onError={(e) => onErrorImg(e)}
      />
      <div className={style.service_item_detail}>
        <p className={style.service_item_detail_name}>
          {productable.name}
        </p>
        <div className={style.service_item_detail_price}>
          {special_price > 0 ? (
            <>
              <span>{formatPrice(special_price)}</span>
              <span>{formatPrice(productable?.price)}</span>
            </>
          ) : (
            <span style={{ color: "var(--purple)" }}>
              {formatPrice(productable?.price)}
            </span>
          )}
        </div>
        {productable?.distance && (
          <div className={style.item_distance}>
            <span></span>
            <h5>{formatDistance(productable?.distance)}</h5>
          </div>
        )}
        <div className={style.item_address}>
          <img src={icon.pinMapRed} alt="" />
          <span>{org?.full_address}</span>
        </div>
      </div>
    </Link>
  )
}

export default SectionService;