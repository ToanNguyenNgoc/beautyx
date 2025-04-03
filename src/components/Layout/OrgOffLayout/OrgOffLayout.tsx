import { Container } from "@mui/material";
import { FC, useContext } from "react";
import style from './org-off-layout.module.css';
import { EmptyRes } from "../EmptyRes";
import { Link } from "react-router-dom";
import { AppContext, AppContextType } from "context";

export const OrgOffLayout: FC = () => {
  const {t} = useContext(AppContext) as AppContextType
  return (
    <Container>
      <div className={style.container}>
        <EmptyRes title={t("Home.org_notfound")} />
        <Link to={'/'} className={style.button}>
          {t("Home.continue_use_app")}
        </Link>
      </div>
    </Container>
  )
}