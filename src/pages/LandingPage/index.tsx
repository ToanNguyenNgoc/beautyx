/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDeviceMobile, useSwr } from 'hooks'
import PageNotFound from 'components/PageNotFound';
import { IBanner } from 'interface/banner'
import style from './landing.module.css'
import { Container } from '@mui/material';
import { TypeLandingPage, TypeSearchResult, TypePopup } from "./components"
import { useHistory } from 'react-router-dom';
import HeadMobile from 'features/HeadMobile';
import { extraParamsUrl } from 'utils';

function LadingPage() {
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const params: any = extraParamsUrl()
    const id = params.id
    const { response, isValidating } = useSwr({ API_URL: `/banners/${id}`, enable: id })
    let render = true
    if (!id || (!response && !isValidating)) render = false
    const banner: IBanner = response
    useEffect(() => {
        if (banner?.type === "ORGANIZATION") history.replace(`/cua-hang/${banner.origin_id}`)
    }, [banner])
    return (
        <>
            <>
                {IS_MB && <HeadMobile title={banner?.name ?? ""} />}
                <div className={style.container}>
                    <Container>
                        {banner?.type === "SEARCH_RESULT" && <TypeSearchResult banner={banner} />}
                        {banner?.type === "HTML" && <TypeLandingPage banner={banner} />}
                        {banner?.type === "POPUP" && <TypePopup banner={banner} />}
                    </Container>
                </div>
            </>
            {!render && <PageNotFound />}
        </>
    );
}

export default LadingPage;