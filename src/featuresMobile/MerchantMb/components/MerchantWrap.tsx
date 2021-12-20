import React, { useEffect, useState } from 'react';
import icon from '../../../constants/icon';
import DetailInfoUtil from '../../../features/MerchantDetail/components/DetailInfoUtil';
import DetailPersonnel from '../../../features/MerchantDetail/components/DetailPersonnel';
import DetailComment from '../../../features/MerchantDetail/components/DetailComment';
import DetailBranchesList from './DetailBranchesList'
import { utilsList } from '../../../features/MerchantDetail/components/DetailInfo';
import { staffList } from '../../../features/MerchantDetail/components/DetailInfo';
import {Slide, Dialog} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

function MerchantWrap(props: any) {
      const { open, setOpen, display, branches } = props;
      const [element, setElement] = useState(<DetailInfoUtil utilsList={utilsList} />);
      useEffect(() => {
            switch (display) {
                  case 1:
                        return setElement(<DetailInfoUtil utilsList={utilsList} />);
                  case 2:
                        return setElement(<DetailBranchesList branches={branches} />);
                  case 3:
                        return setElement(<DetailPersonnel list={staffList} />);
                  case 4:
                        return setElement(<DetailComment />)
                  default:
                        break;
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [display])
      const onClose = () => {
            setOpen(false)
      }
      return (
            <Dialog
                  open={open}
                  fullScreen
                  onClose={onClose}
                  TransitionComponent={Transition}
            >
                  <div className="mb-mer-cnt__box">
                        <div className="flex-row-sp mb-mer-cnt__box-head">
                              <div></div>
                              <img onClick={onClose} src={icon.x} alt="" />
                        </div>
                        <div className="mb-mer-cnt__box-content">
                              {element}
                        </div>
                  </div>
            </Dialog>
            // <div
            //       style={open === true ? { marginTop: '0px' } : { marginTop: '100vh' }}
            //       className="mb-mer-cnt"
            // >
            //       <div className="mb-mer-cnt__box">
            //             <div className="flex-row-sp mb-mer-cnt__box-head">
            //                   <div></div>
            //                   <img onClick={onClose} src={icon.x} alt="" />
            //             </div>
            //             <div className="mb-mer-cnt__box-content">
            //                   {element}
            //             </div>
            //       </div>
            // </div>
      );
}

export default MerchantWrap;