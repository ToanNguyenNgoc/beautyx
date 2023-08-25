import { BackTopButton, Seo } from "components/Layout";
import style from "./approve.module.css"
import { Container } from "@mui/material";
import { QR_KEY, STALE_TIME } from "config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { statisticApi } from "api";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApproveItem } from "pages/HomePage/components";
import { LoadGrid } from "components/LoadingSketion";
import { useDeviceMobile } from "hooks";
import HeadMobile from "features/HeadMobile";

function OrganizationsApprove() {
  const mb = useDeviceMobile()
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QR_KEY.APPROVE],
    queryFn: ({ pageParam = 1 }) => statisticApi.orgsApprove({ page: pageParam, limit: 16 }),
    staleTime: STALE_TIME,
    getNextPageParam: (page) => page?.context?.current_page + 1
  })
  const approves = data?.pages.map(i => i.context.data).flat() || []
  const total = data?.pages[0]?.context.total || 0
  return (
    <>
      <Seo title="Doanh nghiệp mới tham gia" />
      {mb && <HeadMobile title='Doanh nghiệp mới' />}
      <Container>
        <div className={style.container}>
          <InfiniteScroll
            dataLength={approves?.length}
            hasMore={approves.length < total ? true : false}
            loader={<></>}
            next={fetchNextPage}
          >
            <div className={style.list_approve} >
              {
                approves?.map(item => (
                  <ApproveItem key={item.id} item={item} skipFetchGalleries />
                ))
              }
            </div>
            <LoadGrid item_count={8} grid={mb ? 1 : 4} />
          </InfiniteScroll>
        </div>
      </Container>
      <BackTopButton />
    </>
  );
}

export default OrganizationsApprove;