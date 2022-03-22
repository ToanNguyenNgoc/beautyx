import React, { useContext, useState } from 'react';
import './bottom.css';
import icon from '../../constants/icon';
import {useHistory} from 'react-router-dom';
import SearchFilter from '../SearchResult/SearchFilter';
import { AppContext } from '../../context/AppProvider';
import scrollTop from '../../utils/scrollTop';
import notifications from '../../data/listNotifications';

function Bottom(props: any) {
      const { t, acBtn, setAcBtn } = useContext(AppContext)
      const Btns = [
            {
                  id: 2,
                  title: t('Bottom.appointment'),
                  icon_active: icon.Calendar,
                  icon: icon.Calendar_1,
                  path: '/Calendar',
                  is_badge: false,
            },
            {
                  id: 3,
                  title: t('cart.noti'),
                  icon_active: icon.Bell,
                  icon: icon.Bell_1,
                  path: '/Notifications',
                  is_badge: true,
                  count: notifications.filter((item: any) => item.isRead === false).length
            },
            {
                  id: 1,
                  title: t('Bottom.home'),
                  icon_active: icon.home,
                  icon: icon.home_1,
                  path: '/',
                  is_badge: false,
            },
            {
                  id: 4,
                  title: t('Bottom.account'),
                  icon_active: icon.User,
                  icon: icon.User_1,
                  path: '/tai-khoan/thong-tin-ca-nhan',
                  is_badge: false,
            },
      ]
      const [openFilter, setOpenFilter] = useState(false);
      const history = useHistory();
      const chooseBtn = (item: any) => {
            scrollTop();
            setAcBtn(item.id)
            history.push(`${item.path}`)
      }
      return (
            <div className='bt'>
                  <div className="flex-row-sp bt-cnt">
                        {
                              Btns.map(item => (
                                    <div
                                          key={item.id}
                                          onClick={() => chooseBtn(item)}
                                          className="flex-column bt-cnt__item"
                                    >
                                          <img src={item.id === acBtn ? item.icon_active : item.icon} alt="" />
                                          {
                                                item.is_badge === true ?
                                                      <span className="bt-cnt__item-badge">
                                                            {item.count}
                                                      </span>
                                                      :
                                                      <></>
                                          }
                                          <span
                                                style={item.id === acBtn ? { color: 'var(--purple)', fontWeight:'700' } : {}}
                                                className="bt-cnt__item-title"
                                          >
                                                {item.title}
                                          </span>
                                    </div>
                              ))
                        }
                        {/* <div
                              onClick={() => setOpenFilter(true)}
                              className="flex-column bt-cnt__item"
                        >
                              <img src={icon.searchPurple} alt="" />
                              <span
                                    className="bt-cnt__item-title"
                              >
                                    {t('Bottom.search')}
                              </span>
                        </div> */}
                  </div>
                  <SearchFilter
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                  />
            </div>
      );
}

export default Bottom;