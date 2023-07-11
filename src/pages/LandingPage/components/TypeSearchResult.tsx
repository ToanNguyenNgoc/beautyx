import { IBanner } from 'interface/banner';
import { useFetch } from 'hooks';
import { ProductableItem } from 'components/Layout'
import style from "./style.module.css"
import { Productable } from 'interface';

export function TypeSearchResult({ banner }: { banner: IBanner }) {
    const condition = banner ? true : false
    const url = banner?.url ?? ""
    const { response } = useFetch(condition, url)
    return (
        <>
            <div className={style.body}>
                <div className={style.body_container}>
                    <ul className={style.list_item}>
                        {
                            response?.context?.data?.map((item: Productable, index: number) => (
                                <li key={index} className={style.item_container}>
                                    <ProductableItem
                                        productable={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}