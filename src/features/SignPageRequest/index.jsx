import React from 'react';
import BackButton from '../../components/BackButton';
import img from '../../constants/img';
import HomeSignIn from '../Home/components/HomeSignIn';
import './signPageRequest.css'

function SignPageRequest(props) {
      const useForSignRes = true;
      return (
            <>
                  <BackButton />
                  <div className="flex-column sign-res">
                        <img src={img.resultNull} alt="" />
                        <span className="sign-res__title">
                              Oops! Bạn chưa đăng nhập
                        </span>
                        <span className="sign-res__text">
                              Xin lỗi, chúng tôi không thể hiển thị thông tin.<br />
                              Vui lòng đăng nhập để tiếp tục nhé
                        </span>
                        <HomeSignIn
                              useForSignRes={useForSignRes}
                        />
                  </div>
            </>
      );
}

export default SignPageRequest;