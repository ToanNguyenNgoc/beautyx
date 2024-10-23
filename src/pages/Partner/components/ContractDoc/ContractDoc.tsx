import { Dialog } from "@mui/material";
import { FC, memo, useRef } from "react";
import style from './contract-doc.module.css'
import { docs } from "./docs";
// import { XButton } from "components/Layout";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

interface ContractDocProps {
  jsonData?: string;
  open?: boolean;
  onClose?: () => void
}

export const ContractDoc: FC<ContractDocProps> = memo(({
  open = false,
  onClose = () => { },
  jsonData = '{}'
}) => {
  const docRef = useRef<HTMLDivElement>(null)
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={style.cnt}>
        <div ref={docRef} className={style.contract_body} dangerouslySetInnerHTML={{ __html: docs(jsonData).doc1 }} />
      </div>
    </Dialog>
  )
})