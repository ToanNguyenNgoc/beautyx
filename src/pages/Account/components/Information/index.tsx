import React, { ChangeEvent, useContext } from 'react';
import { HeadTitle } from 'pages/Account';
import style from './info.module.css'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { User } from 'interface';
import * as Yup from "yup";
import { XInput, XButton } from 'components/Layout'
import { clst } from 'utils';
import { useNoti, usePostMedia } from 'hooks'
import { PopupNotification } from 'components/Notification'
import authentication from 'api/authApi';
import { AxiosError } from 'axios';
import { putUser, updateAsyncUser } from 'redux/profile/userSlice'
import validateForm from 'utils/validateForm'
import icon from 'constants/icon';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { FLAT_FORM_TYPE } from 'rootComponents/flatForm';
import { AppContext } from 'context/AppProvider';
import { useHistory } from 'react-router-dom';

function Information() {
  const { t } = useContext(AppContext) as any
  const { USER } = useSelector((state: IStore) => state.USER)
  return (
    <>
      <HeadTitle title={t('Header.my_acc')} />
      <div className={style.container}>
        {USER && <Form USER={USER} />}
      </div>
    </>
  );
}

export default Information;

interface IValues {
  fullname: string, email: string
}

const Form = ({ USER }: { USER: User }) => {
  const { t } = useContext(AppContext) as any
  const dispatch = useDispatch()
  const history = useHistory()
  const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
  const PLAT_FORM = EXTRA_FLAT_FORM()
  const formik = useFormik({
    initialValues: {
      fullname: USER.fullname || '',
      email: USER?.email || ''
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Vui lòng nhập Họ và tên")
        .min(2, 'Tên đầy đủ phải từ 2 đến 128 ký tự')
        .max(128, 'Tên đầy đủ phải từ 2 đến 128 ký tự'),
      email: Yup.string()
        .required('Vui lòng nhập Email')
        .matches(validateForm.email, 'Vui lòng nhập đúng định dạng Email')
    }),
    onSubmit: async (values) => {
      handleUpdateUser(values)
    },
  })
  const handleUpdateUser = async (values: IValues) => {
    firstLoad()
    try {
      await authentication.putUserProfile({
        fullname: values.fullname,
        email: USER.email !== values.email ? values.email : ''
      })
      resultLoad('Lưu thông tin thành công')
      dispatch(putUser({ ...USER, ...values }))
    } catch (error) {
      const err = error as AxiosError;
      switch (err.response?.status) {
        case 302:
          resultLoad(`Email "${values.email}" đã được sử dụng ! Vui lòng thử Email khác`)
          formik.setFieldValue('email', USER.email)
          break;
        default:
          resultLoad(`Có lỗi xảy ra. Vui lòng thử lại (${err.response?.status}) `)
          break;
      }
    }
  }
  const { handlePostMedia } = usePostMedia()
  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        const model_id = data[0].model_id
        dispatch(updateAsyncUser({ model_id }))
      }
    })
  }
  const onNavigateChangePass = () => {
    history.push('/tai-khoan/doi-mat-khau')
  }

  return (
    <div className={style.form_cnt}>
      <div className={clst([style.form_row, style.form_row_avatar])}>
        <span className={style.form_row_labe}>Avatar</span>
        <div className={style.input_avatar_cnt}>
          <div className={style.avatar_cnt}>
            <img className={style.avatar_img} src={USER?.avatar} alt="" />
            <label htmlFor="file" className={style.avatar_btn}>
              <img src={icon.cameraAcc} alt="" />
            </label>
            <input
              hidden
              id="file"
              type="file"
              name="file"
              accept="image/jpeg"
              onChange={onChangeAvatar}
            />
          </div>
        </div>
      </div>
      <form
        autoComplete='off'
        className={style.form}
        onSubmit={formik.handleSubmit}
      >
        <div className={style.form_row}>
          <span className={style.form_row_labe}>{t('pm.full_name')}</span>
          <XInput
            classNameContainer={style.form_row_input}
            autoFocus={true}
            value={formik.values.fullname}
            name='fullname'
            onChange={formik.handleChange}
            placeholder={t('pm.full_name')}
            textError={formik.errors.fullname}
          />
        </div>
        <div className={style.form_row}>
          <span className={style.form_row_labe}>Email</span>
          <XInput
            classNameContainer={style.form_row_input}
            value={formik.values.email}
            name='email'
            onChange={formik.handleChange}
            placeholder='Email...'
            textError={formik.errors.email}
          />
        </div>
        <div className={style.form_row}>
          <span className={style.form_row_labe}>{t('pm.phone_number')}</span>
          <XInput
            classNameContainer={style.form_row_input}
            value={USER.telephone}
            disabled={true}
          />
        </div>
        <div className={style.form_bot}>
          {
            PLAT_FORM === FLAT_FORM_TYPE.BEAUTYX &&
            <XButton
              className={style.form_bot_btn}
              title={t('form.reset_password')}
              onClick={onNavigateChangePass}
              type='button'
            />
          }
          <XButton
            title={t('acc.save')}
            type='submit'
            loading={noti.load}
          />
        </div>
      </form>
      <PopupNotification
        title={'Thông báo'}
        content={noti.message}
        open={noti.openAlert}
        setOpen={onCloseNoti}
      />
    </div>
  )
}
