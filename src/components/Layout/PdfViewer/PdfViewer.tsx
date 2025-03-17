import { Container, Pagination } from "@mui/material";
import { FC, useState } from "react";
//@ts-ignore
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import style from './pdf.module.css'
import { scrollTop } from "utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  fileUrl: string
}
export const regexPdf = (fileUrl?: string) => /https?:\/\/.*\.pdf(\?.*)?$/i.test(fileUrl || '')
// export const regexPdf = (fileUrl?: string) => /\/static\/media\/[a-zA-Z0-9_\-]+\.[a-f0-9]+\.pdf/.test(fileUrl || '')

export const PdfViewer: FC<PdfViewerProps> = ({
  fileUrl
}) => {
  console.log(fileUrl)
  const [totalPage, setTotalPage] = useState(1)
  const [pageNumber, setPageNumber] = useState<number>(1);
  return (
    <Container>
      <div className={style.container}>
        <Document file={fileUrl} onLoadSuccess={(e: any) => setTotalPage(e.numPages)}>
          <Page pageNumber={pageNumber} />
        </Document>

        <div className={style.pagination_container}>
          <Pagination
            count={totalPage}
            size="small"
            page={pageNumber}
            onChange={(_e, value: number) => {
              setPageNumber(value);
              scrollTop("auto")
            }}
          />
        </div>
      </div>
    </Container>
  )
}