import { Container } from "@mui/material";
import { useContext } from "react";
import { OrgContext, OrgContextType } from "context";
import { AppContext, AppContextType } from "context/AppProvider";
import { IStaffs } from "interface/staffOrg";
import { onErrorImg } from "utils";
import style from "./style.module.css";

export function Staff() {
  const { staffs, org } = useContext(OrgContext) as OrgContextType;
  const { t } = useContext(AppContext) as AppContextType;
  return (
    <Container>
      <div className={style.container}>
        <div className={style.title}> {t("Mer_de.staff")}</div>
        <ul className={style.list_staff}>
          {staffs.length > 0 &&
            staffs.map((item: IStaffs, index: number) => (
              <li key={index} className={style.item_staff}>
                <div className={style.item_staff_img}>
                  <img
                    onError={(e) => onErrorImg(e)}
                    src={item.avatar ? item.avatar : org.image_url}
                    alt={`${item?.avatar}`}
                  />
                </div>
                <p className={style.item_staff_name}>{item?.user?.fullname}</p>
                <p className={style.item_staff_position}>
                  {item?.group_name?.map((name, index) => (
                    <span key={index}>
                      {index > 0 && ", "}
                      {name}
                    </span>
                  ))}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </Container>
  );
}
