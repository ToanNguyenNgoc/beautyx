/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import { AppContext } from "context/AppProvider";
import TreatmentCardItem from "./ServiceNotBook/TreatmentCardItem";
import { XButton } from "components/Layout";
import { checkTimeExpired, useGetOrder } from "hooks";
import { OrderSkelton } from "pages/Account/components/Orders/components/TabOrderPaid";

function ServicesUser() {
  const { t } = useContext(AppContext) as any;
  const { loading, orders, allowNextPage, isFetchingNextPage, fetchNextPage } = useGetOrder({ 'filter[status]': 'PAID' })
  return (
    <>
      {loading && <OrderSkelton />}
      <Container>
        <div className="flex-row-sp my-ser">
          <div className="my-ser__right">
            <div className="my-ser-book__cnt">
              <div className="my-ser-book">
                <ul>
                  {orders?.map(
                    (item: any, index: number) => (
                      <li key={item.id} style={{ margin: '12px 0px' }}>
                        <TreatmentCardItem
                          key={index}
                          card_items={item}
                          checkTimeExpired={checkTimeExpired}
                        />
                      </li>
                    )
                  )}
                </ul>
                {allowNextPage && (
                  <div className="my-ser-bot">
                    <XButton
                      title={`${t(
                        "trending.watch_all"
                      )}`}
                      onClick={() => fetchNextPage()}
                      loading={isFetchingNextPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ServicesUser;
