import React, { useState } from 'react';
import ServiceNotBook from '../ServiceNotBook';
import ServiceBooked from '../ServiceBooked'

const btnList = [
      { id: 1, title: 'Chưa đặt hẹn' },
      { id: 2, title: 'Đã đặt hẹn' }
]
function ServiceBook(props: any) {
      const { orgAll, chooseOrg, servicesBook, setServicesBook } = props;
      const [activeBtn, setActiveBtn] = useState(1);
      return (
            <div
                  className="my-ser-book__cnt"
            >
                  <div className="my-ser-book__cnt-head">
                        <span className="my-ser-book__cnt-head-title">
                              {
                                    activeBtn === 1 ? 'Chọn dich vụ bạn muốn đặt hẹn' : 'Xem dịch vụ đã đặt hẹn'
                              }
                        </span>
                        <div className="flex-row my-ser-book__cnt-head-btn">
                              <span>
                                    Trạng thái:
                              </span>
                              <div className="btn">
                                    {
                                          btnList.map(item => (
                                                <button
                                                      style={item.id === activeBtn ?
                                                            { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' } : {}
                                                      }
                                                      onClick={() => setActiveBtn(item.id)}
                                                      key={item.id}
                                                >
                                                      {item.title}
                                                </button>
                                          ))
                                    }
                              </div>
                        </div>
                  </div>
                  <ServiceNotBook
                        servicesBook={servicesBook}
                        setServicesBook={setServicesBook}
                        chooseOrg={chooseOrg}
                        orgAll={orgAll}
                        tab_id={activeBtn}
                  />
                  <ServiceBooked
                        tab_id={activeBtn}
                  />
            </div>
      );
}

export default ServiceBook;