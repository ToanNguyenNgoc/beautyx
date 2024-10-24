import { XButton, XInput } from "components/Layout";
import icon from "constants/icon";
import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import * as Yup from "yup";
import style from './register.module.css'
import { AppContext, AppContextType } from "context";
import { useDoAuth } from "hooks";
import validateForm from "utils/validateForm";
import { CountDown } from "../CountDown/CountDown";


export const Register: FC = () => {
  const { t } = useContext(AppContext) as AppContextType
  const [show, setShow] = useState({ password: false, confirm_password: false })
  const { mutationZnsZaloOtp, mutationRegister } = useDoAuth()
  const [verificationId, setVerificationId] = useState<string>()
  const formik = useFormik({
    initialValues: {
      telephone: "",
      code: "",
      fullname: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      telephone: Yup.string().required("Vui lòng nhập số điện thoại").matches(validateForm.phone_new_rule, 'Vui lòng nhập đúng số điện thoại'),
      code: verificationId ?
        Yup.string().trim()
          .required("Vui lòng nhập mã xác thực")
          .min(6, 'Mã xác thực không hợp lệ')
          .max(6, 'Mã xác thực không hợp lệ')
          .matches(/^[0-9]+$/, "Mã xác thực không hợp lệ")
        :
        Yup.string().trim(),
      fullname: verificationId ?
        Yup.string().trim()
          .required('Vui lòng nhập họ và tên')
        :
        Yup.string().trim(),
      email: verificationId ?
        Yup.string().trim()
          .required('Vui lòng nhập Email')
          .matches(validateForm.email, 'Vui lòng nhập đúng Email')
        :
        Yup.string().trim(),
      password: verificationId ?
        Yup.string().trim()
          .required('Vui lòng nhập mật khẩu')
          .min(6, 'Mật khẩu có ít nhất 6 ký tự')
        :
        Yup.string().trim(),
      confirm_password: verificationId ?
        Yup.string().trim()
          .required('Vui lòng nhập lại mật khẩu')
          .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        :
        Yup.string().trim()
    }),
    onSubmit: (values) => {
      const { telephone, code, fullname, email, password } = values
      if (!verificationId) {
        mutationZnsZaloOtp
          .mutateAsync({ telephone: values.telephone })
          .then(() => setVerificationId('zalo'))
      } else {
        mutationRegister.mutate({ telephone, code, fullname, email, password, verification_id: verificationId })
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <XInput
        styleContainer={{ marginBottom: 4 }}
        name="telephone"
        value={formik.values.telephone}
        onChange={formik.handleChange}
        placeholder="Số điện thoại"
        icon={icon.Phone}
        iconSize={22}
        textError={(formik.errors.telephone && formik.touched.telephone) ? formik.errors.telephone : undefined}
        disabled={!!verificationId}
        componentRight={verificationId ? <img src={icon.closeCircle} style={{ width: 22, height: 22 }} alt="" /> : undefined}
        onClickRight={() => {
          setVerificationId(undefined)
          formik.resetForm()
        }}
      />
      {
        verificationId ?
          <>
            <div className={style.count_down_cnt}>
              <CountDown
                seconds={180}
                onClickTimeOut={() => {
                  mutationZnsZaloOtp.mutate({ telephone: formik.values.telephone })
                }}
              />
            </div>
            <XInput
              styleContainer={{ marginBottom: 4 }}
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              placeholder="Mã xác thực"
              icon={icon.Lock}
              iconSize={22}
              textError={(formik.errors.code && formik.touched.code) ? formik.errors.code : undefined}
            />
            <XInput
              styleContainer={{ marginBottom: 4 }}
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              placeholder="Họ và tên"
              icon={icon.User}
              iconSize={22}
              textError={(formik.errors.fullname && formik.touched.fullname) ? formik.errors.fullname : undefined}
            />
            <XInput
              styleContainer={{ marginBottom: 4 }}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              icon={icon.letterPurple}
              iconSize={22}
              textError={(formik.errors.email && formik.touched.email) ? formik.errors.email : undefined}
            />
            <XInput
              styleContainer={{ marginBottom: 4 }}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Mật khẩu"
              icon={icon.Lock}
              iconSize={22}
              type={show.password ? 'text' : 'password'}
              componentRight={(<img src={show.password ? icon.eyeCrossPurple : icon.eye} style={{ width: 22, height: 22 }} alt="" />)}
              onClickRight={() => setShow({ ...show, password: !show.password })}
              textError={(formik.errors.password && formik.touched.password) ? formik.errors.password : undefined}
            />
            <XInput
              styleContainer={{ marginBottom: 4 }}
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              placeholder="Nhập lại mật khẩu"
              icon={icon.Lock}
              iconSize={22}
              type={show.confirm_password ? 'text' : 'password'}
              componentRight={(<img src={show.confirm_password ? icon.eyeCrossPurple : icon.eye} style={{ width: 22, height: 22 }} alt="" />)}
              onClickRight={() => setShow({ ...show, password: !show.confirm_password })}
              textError={(formik.errors.confirm_password && formik.touched.confirm_password) ? formik.errors.confirm_password : undefined}
            />
          </>
          :
          null
      }
      <div className={style.form_submit_btn}>
        <XButton
          title={verificationId ? 'Đăng ký' : 'Lấy mã xác thực'}
          type="submit"
          loading={(!verificationId && mutationZnsZaloOtp.isLoading) || mutationRegister.isLoading}
        />
      </div>
    </form>
  )
}