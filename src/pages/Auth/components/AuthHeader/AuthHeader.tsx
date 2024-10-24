import { FC } from "react";
import style from './auth-header.module.css'
import { Container } from "@mui/material";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import img from "constants/img";
import { Link, useHistory } from "react-router-dom";

interface AuthHeaderProps {
  title?: string
}

export const AuthHeader: FC<AuthHeaderProps> = ({
  title
}) => {
  const history = useHistory()
  return (
    <div className={style.wrapper}>
      <Container className={style.container}>
        <div className={style.left}>
          <XButton
            icon={icon.chevronLeft}
            className={style.back_btn}
            onClick={() => history.goBack()}
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
        </div>
      </Container>
    </div>
  )
}