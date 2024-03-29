import { useQuery } from "@tanstack/react-query";
import { orgApi } from "api";
import API_3RD from "api/3rd-api";
import API_ROUTE from "api/_api";
import axios from "axios";
import { QR_KEY, STALE_TIME } from "config";
import { useSwr } from "hooks";
import { IDiscountPar, IOrgMobaGalleries, IOrganization, Product, Service } from "interface";
import { IStaffs } from "interface/staffOrg";
import { ITrend } from "pages/Trends/trend.interface";
import { ParamsStaffs } from "params-query/param.interface";
import { ReactNode, createContext } from "react";
import { useParams } from "react-router-dom";
import { useGalleriesQuery } from "redux-toolkit-query/hook-home";
import {
  useGetDiscountsOrgQuery,
  useGetServicesSpecialOrgQuery,
  useGetProductsSpecialOrgQuery
} from "redux-toolkit-query/hook-org";

export type OrgContextType = {
  subdomain: string;
  org: IOrganization;
  load: boolean;
  galleries: IOrgMobaGalleries[];
  loadGalleries: boolean;
  discounts: IDiscountPar[];
  servicesSpecial: Service[];
  productsSpecial: Product[];
  trends: ITrend[];
  staffs: IStaffs[];
};

export const OrgContext = createContext<OrgContextType | null>(null);
export function OrgProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const { subdomain } = params as { subdomain: string }
  const { response: resOrg, isValidating: loadOrg } = useSwr({
    API_URL: API_ROUTE.ORG(subdomain),
    enable: subdomain
  })
  const { data, isLoading: loadGalleries } = useGalleriesQuery(subdomain)
  const galleries: IOrgMobaGalleries[] = data ?? []
  const { data: discounts = [] } = useGetDiscountsOrgQuery(
    resOrg?.id, { skip: !resOrg ? true : false }
  )
  const { data: servicesSpecial = [] } = useGetServicesSpecialOrgQuery(subdomain, { skip: !resOrg ? true : false })
  const { data: productsSpecial = [] } = useGetProductsSpecialOrgQuery(subdomain, { skip: !resOrg ? true : false })
  let load = true
  if (!loadOrg && resOrg) load = false
  const org: IOrganization = resOrg

  const { data: dataTrends } = useQuery({
    queryKey: ['VIDEO', org?.id],
    queryFn: () => axios.get(`${API_3RD.API_NODE}/trends`, {
      params: { "filter[organization_id]": org?.id, "include": "comments" },
    }),
    enabled: !!org,
    staleTime: STALE_TIME,
  });
  const trends = dataTrends?.data.data.context.data ?? []

  const paramStaff: ParamsStaffs = {
    "filter[booking_online]": true,
    include: "user|bed",
    append: "group_name|avatar",
  };

  const { data: dataStaffs } = useQuery({
    queryKey: [QR_KEY.STAFFS, org?.id],
    queryFn: () => orgApi.getStaffOrg(+org?.id, paramStaff),
    staleTime: STALE_TIME,
    enabled: !!org
  });
  const staffs = dataStaffs?.context?.data ?? []

  const value = {
    subdomain,
    org,
    load,
    galleries,
    loadGalleries,
    discounts,
    servicesSpecial,
    productsSpecial,
    trends,
    staffs,
  };

  return <OrgContext.Provider value={value} > {children} </OrgContext.Provider>
}