import { Dialog, MenuItem } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import style from "./input.module.css"
import { XButton } from "components/Layout";
import icon from "constants/icon";
import { useDeviceMobile, useTags } from "hooks";
import { ITag } from "interface";

interface SelectTagProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  value?: ITag | null,
  onChange?: (e: ITag) => void
}

export const SelectTag: FC<SelectTagProps> = ({
  open = false, setOpen = () => { },
  value = null, onChange = () => { }
}) => {
  const { tags } = useTags()
  const mb = useDeviceMobile()
  return (
    <Dialog fullScreen={mb} open={open} >
      <div className={style.container}>
        <div className={style.header}>
          <XButton onClick={() => setOpen(false)} icon={icon.chevronLeft} />
          <span>Gắn tag</span>
          <div></div>
        </div>
        <div className={style.body}>
          <div className={style.body_list}>
            {
              tags.map(i => (
                <MenuItem 
                  selected={value?.id === i.id}
                  onClick={()=> onChange(i)} key={i.id} 
                >
                  <span className={style.org_name}>{i.name}</span>
                </MenuItem>
              ))
            }
          </div>
        </div>
      </div>
    </Dialog>
  )
}