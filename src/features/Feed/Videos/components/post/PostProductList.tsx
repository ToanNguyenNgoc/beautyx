import icon from "../../../../../constants/icon";
import formatPrice from '../../../../../utils/formatPrice';
import errorImg from '../../../../../utils/errorImg';
// // interface
// import { IOrganization } from '../../../../../interface/organization';
// import { IComment } from '../../../../../interface/comments';
// import { Service } from '../../../../../interface/service';
// // ---- interface ----
// interface IData {
//     org?: IOrganization | null;
//     ser?: Service[]|null;
//     cmt?: Comments|undefined
// }
// interface Comments {
//     comments?:IComment[];
//     totalItem?:number
// }
 // ---- end ----
export default function PostProductList (props:any) {
    const {data} = props
    return (
        <div className="video-item_product_list">
            <div>
                {
                    data?.ser?.map((item: any, index: any) => (
                        <div key={index} className="video-item_product_item">
                            <div className="video-item_product_item-img">
                                <img src={(item?.image_url) ? item?.image_url : ''} onError={(e) => errorImg(e)} alt="" />
                            </div>
                            <div className="video-item_product_item-title">
                                {item?.service_name}
                            </div>
                            <div className="video-item_product_item-price">
                                {formatPrice(item?.price)} đ
                        </div>
                            <div className="video-item_product_item-special_price">
                                {formatPrice(item?.price)} đ
                        </div>
                            <div className="video-item_product_item-add_cart">
                                <img src={icon.shopingCartAddBlack} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}