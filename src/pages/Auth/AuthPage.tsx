import React, { FC } from "react";
import style from './auth.module.css'
import { AuthHeader, Forgot, Login, Register } from "./components";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string"
import { Container } from "@mui/material";
import img from "constants/img";
import { path } from "route/path";

export const AuthPage: FC = () => {
  const location = useLocation()
  const params = queryString.parse(location.search) as { ref?: 'login' | 'register' | 'forgot' }
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
      <Container>
        <div className={style.body}>
          <div className={style.left}>
            <img src={img.Partner} alt="" />
          </div>
          <div className={style.right}>
            <div className={style.tab_cnt}>
              <Link to={path.auth()} className={`${style.tab_item} ${(!params?.ref || params.ref === 'login') ? style.tab_item_act : ''}`}>
                Đăng nhập
              </Link>
              <Link to={path.auth('register')} className={`${style.tab_item} ${(params?.ref === 'register') ? style.tab_item_act : ''}`}>
                Đăng ký
              </Link>
            </div>
            {renderPage()}
          </div>
        </div>
      </Container>
    </div>
  )
}