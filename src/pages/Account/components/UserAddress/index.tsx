import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext, AppContextType } from 'context/AppProvider';
import { HeadTitle } from 'pages/Account';
import { Alert, XButton } from 'components/Layout';
import { useUserAddress } from 'hooks';
import icon from 'constants/icon';
import style from './address.module.css'
import { Radio } from '@mui/material';
import { IUserAddress } from 'interface';
import userAddressApi from 'api/userAddressApi';

function Address() {
  const history = useHistory();
  const { t } = useContext(AppContext) as AppContextType
  const { addresses, deleteAddress, updateAddress } = useUserAddress()
  const [idLoad, setIdLoad] = useState()
  const onUpdateDefault = (id: number | string) => {
    updateAddress({ id: id, body: { is_default: true }, onlyUpdateDefault: true })
  }
  const onDeleteAddress = (id: number | string) => {
    Alert.open({
      message: t("acc.aswer_delete_address"),
      actions: [
        { text: t("cart.cancel"), onPress() { } },
        { text: t("contact_form.confirm"), onPress() { deleteAddress({ id }) } }
      ]
    })
  }
  const onUpdateAddress = async (item: IUserAddress) => {
    setIdLoad(item.id)
    if (item.address) {
      const { province_data, district_data, ward_data, addressText } = await userAddressApi.getProvinceCodeFromAddress(item.address)
      history.push(`/tai-khoan/dia-chi?id=${item.id}`, {
        item: Object.assign(item, { addressText }),
        province_data: Object.assign(province_data, { txt: province_data.name, code: province_data.province_code }),
        district_data: Object.assign(district_data, { txt: district_data.name, code: district_data.district_code }),
        ward_data: Object.assign(ward_data, { txt: ward_data.name, code: ward_data.district_code }),
      })
    }
    setIdLoad(undefined)
  }
  return (
    <>
      <HeadTitle
        title={t('acc.order_address')}
        rightBtn={
          <XButton
            onClick={() => history.push('/tai-khoan/dia-chi')}
            iconSize={14}
            className={style.add_address_btn}
            icon={icon.plusPurple}
          />
        }
      />
      <div className={style.container}>
        <ul className={style.address_list}>
          {
            addresses.map(item => (
              <li
                key={item.id}
                className={
                  !item.is_default ?
                    style.address_item : `${style.address_item} ${style.address_item_de}`
                }
                onClick={() => onUpdateDefault(item.id)}
              >
                <div className={style.address_item_left}>
                  <Radio
                    style={{ padding: '4px', color: 'var(--purple)' }}
                    checked={item.is_default}
                    readOnly
                  />
                  <span className={style.address_name}>{item.address}</span>
                </div>
                <div className={style.address_item_right}>
                  <XButton
                    iconSize={12}
                    icon={icon.editWhite}
                    onClick={e => {
                      e.stopPropagation()
                      onUpdateAddress(item)
                    }}
                    loading={item.id === idLoad}
                  />
                  {
                    !item.is_default &&
                    <XButton
                      iconSize={12}
                      icon={icon.trash}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAddress(item.id)
                      }}
                    />
                  }
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default Address;