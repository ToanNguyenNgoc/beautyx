import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import { PLF_TYPE } from "constants/plat-form"

export const isPlatformViettel = () => {
  const PL = EXTRA_FLAT_FORM()
  return PL === PLF_TYPE.VIETTEL
}