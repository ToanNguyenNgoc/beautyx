import style from '../sign-page.module.css'
import { SignInZalo } from './SignInZalo';

function SignInSocial() {
    return (
        <div className={style.social}>
            <p className={style.social_title}>
                hoặc đăng nhập với
            </p>
            <div className={style.social_list_btn}>
                <SignInZalo />
            </div>
        </div>
    );
}

export default SignInSocial;