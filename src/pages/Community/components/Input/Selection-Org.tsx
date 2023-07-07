import { Avatar, CircularProgress, Dialog, MenuItem } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { orgApi } from "api"
import { XButton } from "components/Layout"
import icon from "constants/icon"
import { IOrganization } from "interface"
import { debounce } from "lodash"
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react"
import style from './input.module.css'
import img from "constants/img"
import { useDeviceMobile } from "hooks"

interface SelectOrgProps {
  value?: IOrganization | null,
  onChange?: (e: IOrganization) => void
  open?: boolean,
  setOpen?: Dispatch<SetStateAction<boolean>>,
}
export const SelectOrg: FC<SelectOrgProps> = ({
  value, onChange = () => { }, open = false, setOpen = () => { }
}) => {
  const mb = useDeviceMobile()
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (keyword: string) => orgApi.getAll({ keyword }).then(res => res.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounceKeyword = useCallback(
    debounce((keyword) => mutate(keyword), 400),
    []
  )
  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => onDebounceKeyword(e.target.value)
  const onSelect = (org: IOrganization) => onChange(org)
  return (
    <Dialog fullScreen={mb} open={open}>
      <div className={style.container}>
        <div className={style.header}>
          <XButton onClick={() => setOpen(false)} icon={icon.chevronLeft} />
          <span>Gắn thẻ doanh nghiệp</span>
          <div></div>
        </div>
        <div className={style.body}>
          <div className={style.body_input}>
            <input autoFocus onFocus={() => mutate('')} onChange={onChangeKeyword} type="text" placeholder={value?.name || "Tìm kiếm doanh nghiệp..."} />
            {isLoading && <CircularProgress size={16} />}
            <XButton onClick={() => setOpen(false)} className={style.finish_btn}>Xong</XButton>
          </div>
          <div className={style.body_list}>
            {
              data?.context?.data?.map((item: IOrganization) => (
                <MenuItem
                  selected={value?.id === item.id}
                  onClick={() => onSelect(item)}
                  key={item.id
                  }>
                  <Avatar alt={item.name} src={item.image_url ?? img.beautyx} />
                  <span className={style.org_name}>{item.name}</span>
                </MenuItem>
              ))
            }
          </div>
        </div>
      </div>
    </Dialog>
  )
}