import { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material'
import { AxiosError } from "axios";
import SignVeriOtp from './SignVeriOtp';
import { AppContext } from 'context/AppProvider';
import authentication from 'api/authApi';
import validateForm from 'utils/validateForm';
import icon from 'constants/icon';
import { BackButton, Input, XButton } from 'components/Layout'
import { PopupNotification } from 'components/Notification'
import { useHistory } from 'react-router-dom';

import style from '../sign-page.module.css'
import { useCountDown, useNoti } from 'hooks';

function SignUps(props: any) {
    const { t } = useContext(AppContext)
    const { setActiveTabSign } = props;
    const history = useHistory()
    const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
    const { sec, setSec } = useCountDown(60)
    const [show, setShow] = useState({ pass: false, confirm: false })
    const [versionOtp, setVersionOtp] = useState<"v1" | "v2">("v1")
    const [openOtp, setOpenOtp] = useState(true);
    const [dataOtp, setDataOtp] = useState({
        telephone: '',
        verification_id: ''
    })
    const onBackSignIn = () => {
        setActiveTabSign(1)
        history.replace({ pathname: '/sign-in', search: '1' })
    }
    const handleAsyncForgotPass = async (val: any) => {
        const params = {
            telephone: val.telephone,
            new_password: val.password,
            code: val.code,
            verification_id: val.verification_id
        }
        try {
            await authentication.forgotPassword(params);
            resultLoad(
                t('form.register_success'),
                <XButton
                    title={t('form.back_to_sign_in_page')}
                    onClick={onBackSignIn}
                />
            )
        } catch (error) {
            resultLoad(t('form.an_error'))
        }
    }
    async function handleSubmitForm(values: any) {
        firstLoad()
        const params = {
            fullname: values.name,
            email: values.email,
            telephone: dataOtp.telephone,
            code: values.code,
            verification_id: dataOtp.verification_id,
            password: values.password,
            platform: 'BEAUTYX'
        }
        try {
            if (versionOtp === "v1") {
                await authentication.register(params);
            }
            if (versionOtp === "v2") {
                await authentication.forgotVoiceSms({
                    telephone: params.telephone,
                    code: params.code,
                    new_password: params.password
                })
            }
            resultLoad(
                t('form.register_success'),
                <XButton
                    title={t('form.back_to_sign_in_page')}
                    onClick={onBackSignIn}
                />
            )
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 400) {
                handleAsyncForgotPass(params)
            } else {
                resultLoad(`${t('form.an_error')} (${err.response?.status})`)
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            code: '',
            password: '',
            confirm_password: '',
            sex: '',
            agree: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "T??n l???n h??n 2 k?? t???")
                .required("Vui l??ng nh???p h??? v?? t??n")
                .matches(
                    validateForm.fullname,
                    "T??n kh??ng ????ng ?????nh d???ng"
                ),
            sex: Yup.string().required("Vui l??ng ch???n gi???i t??nh"),
            email: Yup.string()
                .required("Vui l??ng nh???p Email ho???c S??? ??i???n tho???i")
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    validateForm.email,
                    "Vui l??ng nh???p ????ng ?????nh d???ng Email"
                ),
            code: Yup.string()
                .required("Vui l??ng nh???p m?? x??c th???c")
                .matches(/^[0-9]+$/, "M?? x??c th???c kh??ng h???p l???")
                .min(4, 'M?? x??c th???c g???m 6 k?? t???')
                .max(6, 'M?? x??c th???c g???m 6 k?? t???'),
            password: Yup.string()
                .min(8, "M???t kh???u l???n h??n 8 k?? t???")
                .max(32, "M???t kh???u t???i ??a 32 k?? t???")
                .required("Vui l??ng nh???p m???t kh???u"),
            confirm_password: Yup.string()
                .required("Vui l??ng x??c nh???n l???i m???t kh???u")
                .oneOf([Yup.ref("password"), null], "M???t kh???u kh??ng kh???p"),
            agree: Yup.boolean().oneOf(
                [true],
                "Vui l??ng ?????c v?? ch???p nh???n ??i???u kho???n"
            ),
        }),
        onSubmit: (values: any) => {
            handleSubmitForm(values)
        }
    })
    const onReSendOtp = async () => {
        await authentication.forgotVoiceSms({
            telephone: dataOtp.telephone
        })
        setSec(60)
        setVersionOtp("v2")
    }
    return (
        <>
            <BackButton onBackFunc={onBackSignIn} />
            <div>
                <SignVeriOtp
                    prevUrl={'/sign-in?1'}
                    open={openOtp}
                    setOpen={setOpenOtp}
                    dataOtp={dataOtp}
                    setDataOtp={setDataOtp}
                    setActiveTabSign={setActiveTabSign}
                />
                <form
                    onSubmit={formik.handleSubmit}
                    autoComplete='off'
                    className={style.form_container}
                >
                    <div className={style.input_wrapper} >
                        <Input
                            className={style.input}
                            icon={icon.User}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name"
                            type="text"
                            placeholder={t("pm.full_name")}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className={style.input_wrapper_error} >
                                {formik.errors.name}
                            </p>
                        )}
                    </div>
                    <div className={style.input_wrapper}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="sex"
                                value={formik.values.sex}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value="male"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#7161BA",
                                                "&.Mui-checked": {
                                                    color: "#7161BA",
                                                },
                                            }}
                                        />
                                    }
                                    label={t("form.male")}
                                />
                                <FormControlLabel
                                    value="female"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#7161BA",
                                                "&.Mui-checked": {
                                                    color: "#7161BA",
                                                },
                                            }}
                                        />
                                    }
                                    label={t("form.female")}
                                />
                                <FormControlLabel
                                    value="other"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#7161BA",
                                                "&.Mui-checked": {
                                                    color: "#7161BA",
                                                },
                                            }}
                                        />
                                    }
                                    label={t("form.other")}
                                />
                            </RadioGroup>
                        </FormControl>
                        {formik.errors.sex && formik.touched.sex && (
                            <p className={style.input_wrapper_error}>
                                {formik.errors.sex}
                            </p>
                        )}
                    </div>
                    <div className={style.input_wrapper}>
                        <Input
                            className={style.input}
                            icon={icon.Message}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className={style.input_wrapper_error}>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className={style.input_column}>
                        <div className={style.input_wrapper}>
                            <Input
                                className={style.input}
                                icon={icon.Lock}
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                name="code"
                                type="text"
                                placeholder="M?? x??c th???c"
                            />
                            {formik.errors.code && formik.touched.code && (
                                <p className={style.input_wrapper_error}>{formik.errors.code}</p>
                            )}
                        </div>
                        {
                            sec > 0 ?
                                <span className={style.opt_count_down}>H???t h???n sau {sec}s</span>
                                :
                                <XButton
                                    className={style.btn_change_phone}
                                    title='G???i l???i m??'
                                    onClick={onReSendOtp}
                                />
                        }
                    </div>
                    <div className={style.input_wrapper}>
                        <Input
                            className={style.input}
                            icon={icon.Lock}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                            type={show.pass ? 'text' : 'password'}
                            placeholder={t("Home.Sign_in_pl_password")}
                        />
                        <img
                            onClick={() => setShow({ ...show, pass: !show.pass })}
                            className={style.input_wrapper_icon_show}
                            src={show.pass ? icon.eyeCrossPurple : icon.eye}
                            alt=""
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className={style.input_wrapper_error}>{formik.errors.password}</p>
                        )}
                    </div>
                    <div className={style.input_wrapper}>
                        <Input
                            className={style.input}
                            icon={icon.Lock}
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            name="confirm_password"
                            type={show.confirm ? 'text' : 'password'}
                            placeholder={t("form.confirm_password")}
                        />
                        <img
                            onClick={() => setShow({ ...show, confirm: !show.confirm })}
                            className={style.input_wrapper_icon_show}
                            src={show.confirm ? icon.eyeCrossPurple : icon.eye}
                            alt=""
                        />
                        {formik.errors.confirm_password && formik.touched.confirm_password && (
                            <p className={style.input_wrapper_error}>{formik.errors.confirm_password}</p>
                        )}
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.sign_check_left}>
                            <Checkbox
                                value={formik.values.agree}
                                onChange={formik.handleChange}
                                name="agree"
                                sx={{
                                    color: "#7161BA",
                                    "&.Mui-checked": {
                                        color: "#7161BA",
                                    },
                                }}
                            />
                            <div className={style.form_policy}>
                                {t("form.i_agree")}
                                <span>{t("form.myspa_s_terms")}</span>
                            </div>
                        </div>
                        {formik.errors.agree && formik.touched.agree && (
                            <p className={style.input_wrapper_error}>
                                {formik.errors.agree}
                            </p>
                        )}
                    </div>
                    <div className={style.form_submit_btn}>
                        <XButton
                            title={t("Home.Sign_up")}
                            type="submit"
                            loading={noti.load}
                        />
                    </div>
                </form>
                <PopupNotification
                    title='Th??ng b??o'
                    open={noti.openAlert}
                    content={noti.message}
                    children={noti.element}
                    setOpen={onCloseNoti}
                />
            </div>
        </>
    );
}

export default SignUps;