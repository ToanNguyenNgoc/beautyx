import icon from 'constants/icon';
import IStore from 'interface/IStore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IGroup } from '../data';
import { Input } from './Input'
import style from './Post/com-cpn.module.css';

export function PostInput({ group }: { group: IGroup }) {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const { USER } = useSelector((state: IStore) => state.USER)
  const handleOpenPostForm = () => {
    if (!USER) return history.push('/sign-in?1')
    setOpen(true)
  }
  return (
    <>
      <div className={style.post_inp_cnt}>
        <div className={style.post_inp_head}>
          <div className={style.post_inp_head_user}>
            <img src={USER?.avatar ?? icon.Avatar} alt="" />
          </div>
          <div onClick={handleOpenPostForm} className={style.post_inp_head_btn}>
            <p>Bạn viết gì đi...</p>
          </div>
        </div>
      </div>
      {USER && <Input open={open} setOpen={setOpen} />}
    </>
  );
}