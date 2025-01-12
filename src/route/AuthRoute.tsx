/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from 'hooks'
import {  useHistory } from 'react-router-dom'
import React, { ReactNode, useEffect } from 'react'
import { path } from './path'

interface LayoutProps {
    children: ReactNode[] | ReactNode
}

function AuthRoute({ children }: LayoutProps) {
    const history = useHistory()
    const { firstLoad, USER } = useAuth()
    useEffect(() => {
        if (!firstLoad && !USER) history.replace(path.auth())
    }, [firstLoad, USER])
    return (
        <>
            {children}
        </>
    );
}

export default AuthRoute;

