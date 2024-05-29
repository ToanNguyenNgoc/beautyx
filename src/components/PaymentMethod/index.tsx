/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useGetPaymentMethodQuery } from 'redux-toolkit-query/hook-home';
import { IPaymentMethod } from 'interface'
import style from './pm.module.css'
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { AppContext } from 'context/AppProvider';
import { LIST_METHOD, MOMO, PAY_ON_BTX, VIETTELPAY } from 'common';
import { PLF_TYPE } from 'constants/plat-form';
import { storage_keys } from '../../constants';


interface PaymentMethodType {
  onSetPaymentMethod?: (method_id: IPaymentMethod) => void
}

const instanceInitStateMethodKey = () => {
  const PLAT_FORM = EXTRA_FLAT_FORM()
  let key = MOMO.name_key
  switch (PLAT_FORM) {
    case PLF_TYPE.VIETTEL:
      key = VIETTELPAY.name_key
      break;
    default:
      key = MOMO.name_key
      if (localStorage.getItem(storage_keys.local_pm_method) === VIETTELPAY.name_key) {
        key = VIETTELPAY.name_key
      } else if (localStorage.getItem(storage_keys.local_pm_method) === PAY_ON_BTX.name_key) {
        key = PAY_ON_BTX.name_key
      }
      break;
  }
  return key
}

function PaymentMethod(props: PaymentMethodType) {
  const { t } = useContext(AppContext) as any
  const { onSetPaymentMethod } = props
  const PLAT_FORM = EXTRA_FLAT_FORM()
  const { data } = useGetPaymentMethodQuery()
  const methods: IPaymentMethod[] = data || []

  let LIST = LIST_METHOD.map((i: IPaymentMethod) => ({
    ...i,
    id: Number(methods.find(item => item.id === i.id)?.id)
  }))
  if (PLAT_FORM === PLF_TYPE.MOMO) {
    LIST = LIST.filter(i => i.name_key === MOMO.name_key)
  }
  if (PLAT_FORM === PLF_TYPE.VIETTEL) {
    LIST = LIST.filter(i => i.name_key === VIETTELPAY.name_key)
  }



  const [methodKey, setMethodKey] = useState(instanceInitStateMethodKey())
  const method = methods.find(i => i.name_key === methodKey)
  useEffect(() => {
    let mount = true
    if (mount && method && onSetPaymentMethod) {
      onSetPaymentMethod(method)
    }
    return () => { mount = false }
  }, [method])

  const onChooseMethod = (item: IPaymentMethod) => {
    localStorage.setItem(storage_keys.local_pm_method, item.name_key)
    setMethodKey(item.name_key)
  }

  return (
    <>
      <p className={style.title}>{t('pm.payment_method')}</p>
      <div className={style.container}>
        <div className={style.drawer}>
          <ul className={style.list_method}>
            {
              LIST.map((item: IPaymentMethod, index: number) => (
                <li
                  style={item.name_key === methodKey ? {
                    border: 'solid 1px var(--pr-green)'
                  } : {
                    border: 'solid 1px var(--white)'
                  }}
                  key={index} className={style.method_item}
                  onClick={() => onChooseMethod(item)}
                >
                  <img className={style.method_item_img} src={item.icon} alt="" />
                  <div className={style.method_item_content}>{item.content}</div>
                </li>
              ))
            }
          </ul>
        </div>
        {/* <Drawer open={open} onClose={() => setOpen(false)} anchor={IS_MB ? "bottom" : "right"} >
          <div className={style.drawer_cnt}>
            <p className={style.title}>{t('pm.payment_method')}</p>
            <div className={style.drawer}>
              <ul className={style.list_method}>
                {
                  LIST.map((item: IPaymentMethod, index:number) => (
                    <li
                      style={item.name_key === methodKey ? {
                        backgroundColor: 'var(--pink-momo)',
                        color: 'var(--bg-white)'
                      } : {}}
                      key={index} className={style.method_item}
                      onClick={() => onChooseMethod(item)}
                    >
                      <img src={item.icon} alt="" />
                      <div className={style.method_item_content}>{item.content}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </Drawer> */}
      </div>
    </>
  );
}

export default PaymentMethod;