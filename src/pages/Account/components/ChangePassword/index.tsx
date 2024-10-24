import { AppContext } from 'context/AppProvider';
import IStore from 'interface/IStore';
import { HeadTitle } from 'pages/Account';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import style from './change-pass.module.css'
import { Forgot } from 'pages/Auth/components';

function ChangePassword() {
  const { t } = useContext(AppContext) as any
  const { USER } = useSelector((state: IStore) => state.USER)
  //
  if (!USER?.telephone) return <></>
  return (
    <>
      <HeadTitle title={t('acc.change_pass')} />
      <div className={style.container}>
        <div className={style.form_row}>
          <Forgot telephone={USER?.telephone} />
        </div>
      </div>
      <div id="recaptcha-container" ></div>
    </>
  );
}

export default ChangePassword;