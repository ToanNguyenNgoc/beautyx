import React, { FC } from 'react';
import { policies } from '../../data/policies';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
// import parser from 'html-react-parser';
import './policy.css';
import { Container } from '@mui/material'
import { useDeviceMobile } from 'hooks';
import HeadMobile from 'features/HeadMobile';

function Policy() {
    const params = extraParamsUrl();
    const IS_MB = useDeviceMobile()
    const id = params?.id
    const dataRender = policies.find((item: any) => item.id === Number(id))
    return (
        <>
            {/* {IS_MB && <HeadMobile title={dataRender?.title ?? ''} />}
            {
                id && dataRender &&
                <Container>
                    <div className="po-container">
                        <div dangerouslySetInnerHTML={{ __html: dataRender.templateHtml }}>
                        </div>
                    </div>
                </Container>
            } */}
            <PdfView
                link='https://api.myspa.vn/media/1589954/3.-QUY-CHẾ-HOẠT-ĐỘNG.pdf?v=1742192368'
                title='Quy chế hoạt động'
            />
        </>
    );
}

export default Policy;

const PdfView: FC<{ link: string, title: string }> = ({ link, title }) => {
    return (
        <Container>
            <iframe
                src={link}
                title={title}
                style={{ width: '500px', height: '1500px' }}
            />
        </Container>
    )
}