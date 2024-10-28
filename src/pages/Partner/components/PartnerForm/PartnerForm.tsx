import { Checkbox, Dialog } from "@mui/material";
import { FC, useContext } from "react";
import style from './partner-form.module.css'
import { useFormik } from "formik";
import { XButton, XInput } from "components/Layout";
import { AppContext } from "context";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import { useNoti } from "hooks";
import { PopupNotification } from "components/Notification";

interface PartnerFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmitForm?:(e:string)=>void
}

interface ValuesProp {
  full_name: string,
  business_name: string,
  address: string,
  telephone: "" | number,
  email: string,
  tax_code: string,
  tax_code_address: string,
  tax_code_date: string,
  accept: boolean
}


export const PartnerForm: FC<PartnerFormProps> = ({
  open = false,
  onClose = () => { },
  onSubmitForm=()=>{}
}) => {
  const { t } = useContext(AppContext) as any
  const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
  const formik = useFormik<ValuesProp>({
    initialValues: {
      full_name: '',
      business_name: "",
      address: '',
      telephone: '',
      email: '',
      tax_code: '',
      tax_code_address: '',
      tax_code_date: '',
      accept: false
    },
    validationSchema: Yup.object({
      business_name: Yup.string().required(t('form.txt_enter_business_name')),
      telephone: Yup.number().required(t("form.please_enter_your_phone")),
      tax_code: Yup.string().required(t('form.txt_enter_tax_code')),
      accept: Yup.boolean().oneOf([true], t('form.txt_please_accept_policy'))
    }),

    onSubmit(values, formikHelpers) {
      console.log(values)
      firstLoad()
      setTimeout(() => {
        resultLoad('')
        // resultLoad('Đăng ký thành công ! Nhân viên sẽ liên hệ với bạn sớm nhất.')
        onSubmitForm(JSON.stringify(values))
      }, 2000)

    },
  })
  const handleCloseAll = () => {
    onCloseNoti();
    onClose();
    formik.resetForm()
  }
  return (
    <Dialog open={open} onClose={!noti.load ? () => onClose() : undefined}>
      <div className={style.cnt}>
        <p className={style.title}>
          Đăng ký đối tác BeautyX
        </p>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <XInput
            value={formik.values.business_name}
            id='business_name'
            name="business_name"
            placeholder={t("partner.company_name")}
            onChange={formik.handleChange}
            textError={formik.errors.business_name}
          />
          <XInput
            value={formik.values.tax_code}
            id='tax_code'
            name='tax_code'
            placeholder={t('form.txt_tax_code')}
            onChange={formik.handleChange}
            textError={formik.errors.tax_code}
          />
          <XInput
            value={formik.values.tax_code_address}
            id='tax_code_address'
            name='tax_code_address'
            placeholder={t('form.txt_tax_code_address')}
            onChange={formik.handleChange}
          />
          <XInput
            value={formik.values.tax_code_date}
            id='tax_code_date'
            name='tax_code_date'
            placeholder={'Ngày cấp mã số thuế'}
            type="date"
            onChange={formik.handleChange}
          />
          <XInput
            value={formik.values.address}
            id='address'
            name="address"
            placeholder={t("Mer_de.address")}
            onChange={formik.handleChange}
          />
          <XInput
            value={formik.values.full_name}
            id='full_name'
            name="full_name"
            placeholder={t("pm.full_name")}
            onChange={formik.handleChange}
          />
          <XInput
            value={formik.values.telephone}
            id='telephone'
            name="telephone"
            type="number"
            placeholder={t("pm.phone_number")}
            onChange={formik.handleChange}
            textError={formik.errors.telephone}
          />
          <XInput
            value={formik.values.email}
            id='email'
            name="email"
            placeholder={'Email'}
            onChange={formik.handleChange}
          />
          <div className={style.policy}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                onChange={formik.handleChange}
                name="accept"
                sx={{
                  color: 'var(--purple)',
                  '&.Mui-checked': {
                    color: 'var(--purple)',
                  },
                }}
              />
              <span>
                {t('form.txt_accept_policy')}
                <Link to={'/chinh-sach/chinh-sach-bao-mat?id=15'}> {t('footer.privacy_policy')}</Link>
              </span>
            </div>
            <p className={style.policy_error}>
              {formik.errors.accept}
            </p>
          </div>
          <div className={style.form_bottom}>
            <XButton
              type='submit'
              title={t("Home.Sign_up_now")}
              className={style.form_submit_btn}
              loading={noti.load}
            />
          </div>
        </form>
      </div>
      {/* <PopupNotification
        title="Thông báo"
        content={noti.message}
        open={noti.openAlert}
        setOpen={handleCloseAll}
      /> */}
    </Dialog>
  )
}