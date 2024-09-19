import  { FC } from "react";
import style from './auth.module.css'
import { AuthHeader, Forgot, Login, Register } from "./components";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string"
import { Container } from "@mui/material";
import img from "constants/img";
import { path } from "route/path";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { PLF_TYPE } from "constants/plat-form";
import LoginFlatFormRequest from "rootComponents/loginFlatFormRequest/LoginFlatFormRequest";

export const AuthPage: FC = () => {
  const location = useLocation()
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const params = queryString.parse(location.search) as { ref?: 'login' | 'register' | 'forgot' }
  const pathname = location?.state?.from?.pathname;
  const renderPage = () => {
    let el = (<Login />)
    if (params?.ref) {
      switch (params.ref) {
        case 'register':
          el = (<Register />)
          break;
        case 'forgot':
          el = (<Forgot />)
          break;
        default:
          break;
      }
    }
    return el
  }
  return (
    <div className={style.container}>
      <AuthHeader />
      {
        FLAT_FORM === PLF_TYPE.BEAUTYX ?
          <Container>
            <div className={style.body}>
              <div className={style.left}>
                <img src={img.Partner} alt="" />
              </div>
              <div className={style.right}>
                <div className={style.tab_cnt}>
                  {
                    params?.ref === 'forgot' ?
                      <>
                        <span className={`${style.tab_item} ${style.tab_item_act}`}>
                          Quên mật khẩu
                        </span>
                      </>
                      :
                      <>
                        <Link replace={true} to={path.auth()} className={`${style.tab_item} ${(!params?.ref || params.ref === 'login') ? style.tab_item_act : ''}`}>
                          Đăng nhập
                        </Link>
                        <Link replace={true} to={path.auth('register')} className={`${style.tab_item} ${(params?.ref === 'register') ? style.tab_item_act : ''}`}>
                          Đăng ký
                        </Link>
                      </>
                  }
                </div>
                {renderPage()}
              </div>
            </div>
          </Container>
          :
          <Container>
            <LoginFlatFormRequest
              pathname={pathname}
            />
          </Container>
      }
    </div>
  )
}