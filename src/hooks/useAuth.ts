/* eslint-disable react-hooks/exhaustive-deps */
import IStore from "interface/IStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser } from "redux/profile/userSlice";

interface Options {
    refresh_enable?: boolean
}

export function useAuth(options?: Options) {
    const dispatch = useDispatch()
    const [firstLoad, setFirstLoad] = useState(true)
    const { USER } = useSelector((state: IStore) => state.USER)
    const getUser = async () => {
        if (!USER) {
            await dispatch(fetchAsyncUser())
            setFirstLoad(false)
        }
    }
    useEffect(() => {
        if (options?.refresh_enable) {
            dispatch(fetchAsyncUser())
        } else {
            getUser()
        }
    }, [])
    return { firstLoad, USER }
}