import React, { useContext, useState } from 'react';
import HeadMobile from 'features/HeadMobile';
import { authentication, signInWithPhoneNumber, RecaptchaVerifier } from "../../firebase";
import * as Yup from 'yup';
import style from './otp.module.css'
import { useFormik } from 'formik';
import { Input, XButton } from 'components/Layout';
import { AppContext } from 'context/AppProvider';
import { useNoti } from "hooks"
import { PopupNotification } from 'components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { auth } from 'api/authApi'
import { putUser } from 'redux/user/userSlice';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
        recaptchaWidgetId: any;
    }
}
window.confirmationResult = window.confirmationResult || {};

interface IData {
    telephone: string,
    code: string,
    verification_id: string
}

function OtpMbPage() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState({
        telephone: '',
        code: '',
        verification_id: ''
    })

    return (
        <>
            <div className={style.body}>
                {step === 1 && <FormTelephone
                    data={data}
                    setData={setData}
                    step={step} setStep={setStep}
                />}
                {
                    step === 2 &&
                    <FormOtp
                        data={data} setData={setData}
                        step={step} setStep={setStep}
                    />
                }
            </div>
        </>
    );
}

export default OtpMbPage;

interface FormTelephoneProps {
    data: IData,
    setData: (data: IData) => void,
    step: number, setStep: (step: number) => void
}

const FormTelephone = (props: FormTelephoneProps) => {
    const { data, setData, setStep } = props
    const { t } = useContext(AppContext)
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const generateRecaptcha = async () => {
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: (value: any) => {
                            // handleSubmit(value, true)
                        },
                        'expired-callback': () => {
                            // Response expired. Ask user to solve reCAPTCHA again.
                            // ...
                        },
                    },
                    authentication
                )
            } else {
                window.recaptchaVerifier.render();
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    //handle form telephone
    const handleSubmitTelephone = async (values: any) => {
        firstLoad()
        let phoneNumberVN = "+84" + values.telephone.toString().slice(1);
        try {
            const res = await signInWithPhoneNumber(authentication, phoneNumberVN, window.recaptchaVerifier)
            setData({
                ...data,
                telephone: values.telephone,
                verification_id: res.verificationId
            })
            resultLoad('')
            setStep(2)
        } catch (error) {
            console.log(error);
            let errorCode = error.code;
            let messCode = error.message;
            if (
                errorCode === "auth/quota-exceeded" ||
                errorCode === "auth/too-many-requests"
            ) {
                resultLoad('S??? ??i???n tho???i ???? ?????t gi???i h???n cho ph??p g???i m?? x??c th???c (OTP) trong ng??y')
            } else if (
                messCode ===
                "reCAPTCHA has already been rendered in this element"
            ) {
                resultLoad('Qu?? s??? l???n nh???n Otp t???i l???i trang ????? ti???p t???c ...')
            }
            else {
                resultLoad('Qu?? s??? l???n nh???n Otp t???i l???i trang ????? ti???p t???c ..')
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            telephone: data.telephone
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required(t("form.please_enter_your_phone")),
        }),
        onSubmit: (values) => {
            generateRecaptcha()
            handleSubmitTelephone(values)
        }
    })
    return (
        <>
            <HeadMobile
                title='C???p nh???t th??ng tin'
            />
            <div className={style.container}>
                <div id="recaptcha-container" ></div>
                <form
                    className={style.form_cnt}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        onChange={formik.handleChange}
                        name="telephone"
                        value={formik.values.telephone}
                        placeholder={t("pm.phone_number")}
                    />
                    {
                        formik.errors.telephone && formik.touched.telephone &&
                        <span className="for-pass-cnt__phone-err">
                            {formik.errors.telephone}
                        </span>
                    }
                    <div className={style.form_btn}>
                        <XButton
                            className={style.btn_send_telephone}
                            title='G???i m?? x??c nh???n'
                            type="submit"
                            loading={noti.load}
                        />
                    </div>
                </form>
                <PopupNotification
                    open={noti.openAlert}
                    setOpen={onCloseNoti}
                    title='Th??ng b??o'
                    content={noti.message}
                    children={
                        <XButton
                            title='???? hi???u'
                            onClick={onCloseNoti}
                        />
                    }
                />
            </div>
        </>
    )
}

interface FormOtpProps {
    data: IData, setData: (data: IData) => void,
    step: number, setStep: (step: number) => void
}

const FormOtp = (props: FormOtpProps) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { data } = props;
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const { USER } = useSelector((state: IStore) => state.USER)
    const handleSubmit = async (values: any) => {
        const params = {
            ...data,
            code: values.code
        }
        firstLoad()
        try {
            const res = await auth.putUserProfile(params)
            if (res) {
                dispatch(putUser({ ...USER, telephone: data.telephone }));
                resultLoad(
                    'Thay ?????i th??ng tin th??nh c??ng',
                    <XButton
                        title='Tr??? l???i gi??? h??ng'
                        onClick={() => history.goBack()}
                    />
                )
            }
        } catch (error) {
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 301:
                    return resultLoad('S??? ??i???n tho???i ???? t???n t???i');
                case 502:
                    return resultLoad('L???i h??? th???ng g???i sms qu?? kh??ch vui l??ng th??? l???i sau!')
                default:
                    return resultLoad('???? c?? l???i x???y ra vui l??ng th??? l???i sau!')
            }
        }

    }
    const formik = useFormik({
        initialValues: { code: '' },
        validationSchema: Yup.object({
            code: Yup.string()
                .required('Vui l??ng nh???p m?? OTP'),
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })
    return (
        <>
            <HeadMobile
                title='Nh???p m?? OTP'
                onBack={() => window.location.reload()}
            />
            <div className={style.container}>
                <div className={style.container_title}>
                    M?? OTP ???? ???????c g???i ?????n s??? ??i???n tho???i <h4>{data.telephone}</h4>
                </div>
                <form
                    className={style.form_cnt}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        onChange={formik.handleChange}
                        name="code"
                        value={formik.values.code}
                        placeholder={'Nh???p m?? OTP'}
                    />
                    {
                        formik.errors.code && formik.touched.code &&
                        <span className="for-pass-cnt__phone-err">
                            {formik.errors.code}
                        </span>
                    }
                    <div className={style.form_btn}>
                        <XButton
                            className={style.btn_send_telephone}
                            title='C???p nh???t'
                            type="submit"
                        />
                    </div>
                </form>
                <PopupNotification
                    title='Th??ng b??o'
                    content={noti.message}
                    open={noti.openAlert}
                    setOpen={onCloseNoti}
                    children={noti.element}
                />
            </div>
        </>
    )
}