import React from 'react';
import { policies } from '../../data/policies';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
// import parser from 'html-react-parser';
import './policy.css';
import { Container } from '@mui/material'
import { useDeviceMobile } from 'hooks';
import HeadMobile from 'features/HeadMobile';
import { PdfViewer, regexPdf } from 'components/Layout';

function Policy() {
    const params = extraParamsUrl();
    const IS_MB = useDeviceMobile()
    const id = params?.id
    const dataRender = policies.find((item: any) => item.id === Number(id));
    console.log(dataRender);
    return (
        <>
            {IS_MB && <HeadMobile title={dataRender?.title ?? ''} />}
            {
                id && dataRender && (
                    regexPdf(dataRender.templateHtml) ?
                        <PdfViewer
                            fileUrl={dataRender.templateHtml}
                        />
                        :
                        <Container>
                            <div className="po-container">
                                <div dangerouslySetInnerHTML={{ __html: dataRender.templateHtml }}>
                                </div>
                            </div>
                        </Container>
                )

            }
        </>
    );
}

export default Policy;