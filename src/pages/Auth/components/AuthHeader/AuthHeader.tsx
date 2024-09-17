import { FC } from "react";
import style from './auth-header.module.css'
import { Container } from "@mui/material";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import img from "constants/img";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
  title?: string
}

export const AuthHeader: FC<AuthHeaderProps> = ({
  title
}) => {
  return (
    <div className={style.wrapper}>
      <Container className={style.container}>
        <XButton
          icon={icon.chevronLeft}
          className={style.back_btn}
        />
        <Link className={style.head_top_left_home} to={{ pathname: "/" }}>
          <img
            className={style.head_top_left_img}
            src={img.beautyxSlogan}
            alt=""
          />
        </Link>
        <span className={style.title}>
          {title}
        </span>
      </Container>
    </div>
  )
}