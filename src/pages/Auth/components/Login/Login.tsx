import { XButton, XInput } from "components/Layout";
import icon from "constants/icon";
import { AppContext, AppContextType } from "context";
import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import * as Yup from "yup";
import style from './login.module.css'
import { Checkbox } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { path } from "route/path";
import { useDoAuth } from "hooks";

export const Login: FC = () => {
  const { t } = useContext(AppContext) as AppContextType;
  const history = useHistory()
  const { mutationLogin } = useDoAuth({
    callBackLoginSuccess: () => history.goBack()
  })
  const [showPass, setShowPass] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập email/số điện thoại"),
      password: Yup.string()
        .min(6, "Mật khẩu lớn hơn 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      mutationLogin.mutateAsync({
        email: values.email,
        password: values.password
      }).then().catch()
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <XInput
        styleContainer={{ marginBottom: 6 }}
        icon={icon.User}
        iconSize={22}
        type="text"
        placeholder={t("Home.Sign_in_pl_user_name")}
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        textError={(formik.errors.email && formik.touched.email) ? formik.errors.email : undefined}
      />
      <XInput
        styleContainer={{ marginBottom: 6 }}
        icon={icon.Lock}
        iconSize={22}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        type={showPass ? 'text' : 'password'}
        placeholder={t("Home.Sign_in_pl_password")}
        componentRight={(<img src={showPass ? icon.eyeCrossPurple : icon.eye} style={{ width: 22, height: 22 }} alt="" />)}
        onClickRight={() => setShowPass(!showPass)}
      />
      <div className={style.sign_check}>
        <div className={style.sign_check_left}>
          <Checkbox
            defaultChecked={true}
            sx={{
              color: "#7161BA",
              "&.Mui-checked": {
                color: "#7161BA",
              },
            }}
          />
          <span>{t("Home.Sign_remember")}</span>
        </div>
        <Link to={path.auth('forgot')} className={style.sign_check_forgot}>
          {t("Home.Sign_forgot")} ?
        </Link>
      </div>
      <div className={style.form_submit_btn}>
        <XButton
          title={t("Home.Sign_in")}
          type="submit"
          loading={mutationLogin.isLoading}
        />
      </div>
    </form>
  )
}