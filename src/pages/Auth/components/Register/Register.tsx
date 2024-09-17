import { FC } from "react";
import { useLocation } from "react-router-dom";

export const Register: FC = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      Register
    </div>
  )
}