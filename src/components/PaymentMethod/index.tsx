/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useGetPaymentMethodQuery } from 'redux-toolkit-query/hook-home';
import { IPaymentMethod } from 'interface'
import style from './pm.module.css'
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { AppContext } from 'context/AppProvider';
import { LIST_METHOD } from 'common';


interface PaymentMethodType {
  onSetPaymentMethod?: (method_id: IPaymentMethod) => void
}

function PaymentMethod(props: PaymentMethodType) {
  const { t } = useContext(AppContext) as any
  const { onSetPaymentMethod } = props
  const PLAT_FORM = EXTRA_FLAT_FORM()
  const { data } = useGetPaymentMethodQuery()
  const methods: IPaymentMethod[] = data || []
  const LIST = LIST_METHOD.map((i: IPaymentMethod) => ({
    ...i,
    id: Number(methods.find(item => item.id === i.id))
  }))

  const [methodKey, setMethodKey] = useState(PLAT_FORM === 'BEAUTYX' ? 'MOMO' : PLAT_FORM)
  const method = methods.find(i => i.name_key === methodKey)
  useEffect(() => {
    let mount = true
    if (mount && method && onSetPaymentMethod) {
      onSetPaymentMethod(method)
    }
    return () => { mount = false }
  }, [method])

  const onChooseMethod = (item: IPaymentMethod) => {
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
                  <img src={item.icon} alt="" />
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