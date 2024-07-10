import { AppContext, AppContextType } from 'context/AppProvider';
import { HeadTitle } from 'pages/Account';
import { useContext, useRef, useState, MouseEvent, KeyboardEvent } from 'react';
import style from './address.module.css'
import { useSelector } from 'react-redux';
import { IDistrict, IProvince, IWard } from 'interface';
import { useNoti, useSwr, useUserAddress } from 'hooks';
import { AlertAppSnack, AlertSnack, XButton } from 'components/Layout';
import { useHistory, useLocation } from 'react-router-dom';
import { extraParamsUrl } from 'utils';

interface Address {
  province: { txt: string, code: number | null } | null;
  district: { txt: string, code: number | null } | null;
  ward: { txt: string, code: number | null } | null;
  text: string | null;
}

function AddressForm() {
  const { t } = useContext(AppContext) as AppContextType
  const history = useHistory()
  const location = useLocation()
  const params = extraParamsUrl() as { id?: string }
  const { postAddress, load, updateAddress } = useUserAddress()
  const refProvince = useRef<HTMLDivElement>(null)
  const refDistrict = useRef<HTMLDivElement>(null)
  const refWard = useRef<HTMLDivElement>(null)
  const refInput = useRef<HTMLTextAreaElement>(null)
  const refCheckbox = useRef<HTMLInputElement>(null)
  const { provinces } = useSelector((state: any) => state.HOME)
  const [address, setAddress] = useState<Address>({
    province: location.state?.province_data || null,
    district: location.state?.district_data || null,
    ward: location.state?.ward_data || null,
    text: location.state?.item?.addressText || null
  })

  const onTriggerOpen = (key: 'pro' | 'dis' | 'ward' | 'none', toggle?: boolean) => {
    const listRef = [
      { key: 'pro', ref: refProvince }, { key: 'dis', ref: refDistrict }, { key: 'ward', ref: refWard }
    ]
    for (var i = 0; i < listRef.length; i++) {
      if (listRef[i].key === key) {
        if (toggle) {
          listRef[i].ref.current?.classList.toggle(style.province_show)
        } else {
          listRef[i].ref.current?.classList.add(style.province_show)
        }
      } else {
        listRef[i].ref.current?.classList.remove(style.province_show)
      }
    }
  }
  window.addEventListener('click', () => onTriggerOpen('none'))

  const onChangeProvince = (province: IProvince, e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    setAddress({
      ...address,
      province: { txt: province.name, code: province.province_code },
      district: province.name !== address.province?.txt ? null : address.district,
      ward: province.name !== address.province?.txt ? null : address.ward,
      text: province.name !== address.province?.txt ? '' : address.text
    })
    onTriggerOpen('dis')
  }
  const onChangeDistrict = (district: IDistrict, e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    setAddress({
      ...address,
      district: { txt: district.name, code: district.district_code },
      ward: district.name !== address.district?.txt ? null : address.ward,
      text: district.name !== address.district?.txt ? '' : address.text
    })
    onTriggerOpen('ward')
  }
  const onChangeWard = (ward: IWard, e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    setAddress({
      ...address,
      ward: { txt: ward.name, code: ward.ward_code },
      text: ward.name !== address.ward?.txt ? null : address.text
    })
    onTriggerOpen('none')
    refInput.current?.focus()
  }
  const { responseArray: districts } = useSwr(
    {
      API_URL: `/provinces/${address.province?.code}/districts`,
      enable: address.province?.code
    }
  )
  const { responseArray: wards } = useSwr(
    {
      API_URL: `/districts/${address.district?.code}/wards`,
      enable: address.district?.code
    }
  )
  const { noti, resultLoad, onCloseNoti } = useNoti()
  const onSaveAddress = () => {
    if (address.ward && address.text) {
      if (params?.id) {
        updateAddress({
          id: params.id,
          body: {
            address: `${address.text}, ${address.ward?.txt}, ${address.district?.txt}, ${address.province?.txt}`,
            is_default: location?.state?.item?.is_default === true ? undefined : refCheckbox.current?.checked
          },
          cb: () => {
            resultLoad(t('acc.update_address_ok'))
            setTimeout(() => { history.goBack() }, 3000)
          }
        })
      } else {
        postAddress({
          body: {
            address: `${address.text}, ${address.ward?.txt}, ${address.district?.txt}, ${address.province?.txt}`,
            is_default: refCheckbox.current?.checked
          },
          cb: () => {
            resultLoad(t('acc.create_address_ok'))
            setTimeout(() => { history.goBack() }, 3000)
          }
        })
      }
    }
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
      event.preventDefault();
      onSaveAddress();
    }
  };
  const onTextAreaChange = (text: string) => {
    setAddress({ ...address, text })
    if (refInput.current) {
      refInput.current.style.height = "auto";
      if (text.length > 0) {
        refInput.current.style.height = refInput.current.scrollHeight + "px";
      }
    }
  }
  return (
    <>
      <HeadTitle
        title={params?.id ? t('acc.update_address') : t('acc.create_address')}
      />
      <AlertSnack
        open={noti.openAlert} onClose={onCloseNoti} title={noti.message} status='SUCCESS'
      />
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.form_row}>
            <label className={style.form_row_label}>{t('acc.province')}</label>
            <div
              onClick={(e) => { e.stopPropagation(); onTriggerOpen('pro', true) }}
              className={style.input_address}
            >
              {address.province?.txt ?? 'Chọn Tỉnh/thành phố'}
            </div>
            <div ref={refProvince} className={style.input_select}>
              <div className={style.input_select_cnt}>
                <ul className={style.input_select_list}>
                  {
                    provinces.map((item: IProvince) => (
                      <li
                        style={item.name === address.province?.txt ? { color: 'var(--purple)', fontWeight: 600 } : {}}
                        onClick={(e) => onChangeProvince(item, e)}
                        key={item.province_code} className={style.input_select_item}
                      >{item.name}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className={style.form_row}>
            <label className={style.form_row_label}>{t('acc.district')}</label>
            <button
              disabled={!address.province}
              onClick={(e) => { e.stopPropagation(); onTriggerOpen('dis', true) }}
              className={style.input_address}
            >
              {address.district?.txt ?? 'Chọn Quận/huyện'}
            </button>
            <div ref={refDistrict} className={style.input_select}>
              <div className={style.input_select_cnt}>
                <ul className={style.input_select_list}>
                  {
                    districts.map((item: IDistrict) => (
                      <li
                        style={item.name === address.district?.txt ? { color: 'var(--purple)', fontWeight: 600 } : {}}
                        onClick={(e) => onChangeDistrict(item, e)}
                        key={item.district_code} className={style.input_select_item}
                      >{item.name}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className={style.form_row}>
            <label className={style.form_row_label}>{t('acc.ward')}</label>
            <button
              disabled={!address.district}
              onClick={(e) => { e.stopPropagation(); onTriggerOpen('ward', true) }}
              className={style.input_address}
            >
              {address.ward?.txt ?? 'Chọn Xã/phường'}
            </button>
            <div ref={refWard} className={style.input_select}>
              <div className={style.input_select_cnt}>
                <ul className={style.input_select_list}>
                  {
                    wards.map((item: IWard) => (
                      <li
                        style={item.name === address.ward?.txt ? { color: 'var(--purple)', fontWeight: 600 } : {}}
                        onClick={(e) => onChangeWard(item, e)}
                        key={item.ward_code} className={style.input_select_item}
                      >{item.name}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className={style.form_row}>
            <label className={style.form_row_label}>Chi tiết địa chỉ</label>
            <textarea
              disabled={!address.ward}
              ref={refInput}
              value={address.text ?? ''}
              className={style.input_address}
              onChange={e => onTextAreaChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={style.form_bot}>
            <div
              className={style.form_bot_check}
              onClick={() => {
                if (location.state?.item?.is_default) {
                  AlertAppSnack.open({ title: t('acc.warning_cancel_address_default'), type: 'warning' })
                }
              }}
            >
              <input
                id="form_address_checkbox"
                type='checkbox' ref={refCheckbox}
                defaultChecked={!!location?.state?.item?.is_default}
                style={{ accentColor: 'var(--purple)' }}
                disabled={!!location.state?.item?.is_default}
              />
              <span>
                <label htmlFor='form_address_checkbox'>Đặt làm mặc định</label>
              </span>
            </div>
            <XButton
              className={style.form_bot_btn}
              title={params?.id ? t('acc.update_address') : t('acc.create_address')}
              onClick={onSaveAddress}
              loading={load.create}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default AddressForm;