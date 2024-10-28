import { Dialog } from "@mui/material";
import { FC, memo, useRef, useState } from "react";
import style from './contract-doc.module.css'
import { docs } from "./docs";
import { AlertAppSnack, XButton } from "components/Layout";
// import { XButton } from "components/Layout";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import SignatureCanvas from 'react-signature-canvas'

interface ContractDocProps {
  jsonData?: string;
  open?: boolean;
  onClose?: () => void;
  onGetSignature?: (signature: string) => void
}

export const ContractDoc: FC<ContractDocProps> = memo(({
  open = false,
  onClose = () => { },
  jsonData = '{}',
  onGetSignature = () => { }
}) => {
  const data = JSON.parse(jsonData)
  const docRef = useRef<HTMLDivElement>(null)
  const signControlRef = useRef<HTMLDivElement>(null)
  const [openSign, setOpenSign] = useState(false)
  const handleDownloadContractDoc = () => {
    try {
      if (!data.signature) {
        return AlertAppSnack.open({
          title: 'Vui lòng thêm chữ ký',
          type: 'warning'
        })
      }
      if (signControlRef.current) {
        signControlRef.current.classList.add(style.doc_control_hide)
      }
      setTimeout(() => { window.print() }, 200)
      setTimeout(() => {
        if (signControlRef.current) {
          signControlRef.current.classList.remove(style.doc_control_hide)
        }
      }, 300)
    } catch (error) { }
  }
  const signRef = useRef<SignatureCanvas>(null)
  //handle Signature
  const handleClearSignature = () => {
    if (signRef.current) {
      signRef.current.clear()
    }
  }
  const handleAcceptSignature = () => {
    if (signRef.current) {
      if (signRef.current.isEmpty()) {
        return AlertAppSnack.open({
          title: 'Vui lòng thêm chữ ký',
          type: 'warning'
        })
      }
      onGetSignature(signRef.current.toDataURL())
      setOpenSign(false)
    }
  }
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <div className={style.cnt}>
          <div ref={docRef} className={style.contract_body} dangerouslySetInnerHTML={{ __html: docs(JSON.stringify(data)).doc1 }} />
        </div>
        <Dialog open={openSign} onClose={() => setOpenSign(false)}>
          <div className={style.sign_cnt}>
            <p className={style.sign_cnt_title}>
              Thêm chữ ký
            </p>
            <SignatureCanvas
              ref={signRef}
              penColor='black'
              canvasProps={{
                width: 400, height: 300, className: 'sigCanvas',
              }}
            />
            <div className={style.sign_cnt_control}>
              <XButton
                onClick={handleClearSignature}
                style={{
                  color: 'var(--purple)',
                  backgroundColor: 'var(--white)',
                  border: 'solid 1px var(--purple)'
                }}
              >
                Xóa
              </XButton>
              <XButton onClick={handleAcceptSignature}>
                Xác nhận
              </XButton>
            </div>
          </div>
        </Dialog>
      </Dialog>
      {
        open &&
        <div className={style.doc_control} ref={signControlRef}>
          <XButton onClick={() => setOpenSign(true)}>
            {data.signature ? 'Thay đổi chữ ký' : 'Thêm chữ ký'}
          </XButton>
          <XButton onClick={handleDownloadContractDoc}>
            Tải bản hợp đồng
          </XButton>
        </div>
      }
    </>
  )
})