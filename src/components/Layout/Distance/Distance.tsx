import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { formatDistance } from "utils";

interface DistanceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  lat?: number
  long?: number
}

export const Distance: FC<DistanceProps> = ({
  lat,
  long,
  ...rest
}) => {
  const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)
  if (!lat || !long || !location_user?.lat || !location_user?.long) {
    return (
      <></>
    )
  }
  const distance = Math.sqrt(Math.pow(location_user.lat - lat, 2) + Math.pow(location_user.long - long, 2))
  return (
    <div style={{fontSize:'12px', fontWeight:600, color:'var(--red-cl)'}} {...rest}>
      {formatDistance(distance * 100000)}
    </div>
  )
}