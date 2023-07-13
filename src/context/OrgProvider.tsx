import { useQuery } from "@tanstack/react-query";
import API_3RD from "api/3rd-api";
import API_ROUTE from "api/_api";
import axios from "axios";
import { CACHE_TIME } from "common";
import { useSwr } from "hooks";
import { IDiscountPar, IOrgMobaGalleries, IOrganization, Product, Service } from "interface";
import { ITrend } from "pages/Trends/trend.interface";
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
    queryKey: ['VIDEO',  org?.id ],
    queryFn: () => axios.get(`${API_3RD.API_NODE}/trends`, {
      params: { "filter[organization_id]": org?.id, "include":"comments" },
    }),
    enabled: org?.id ? true : false,
    cacheTime: CACHE_TIME,
  });
  const trends = dataTrends?.data.data.context.data ?? []
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
  };

  return <OrgContext.Provider value={value} > {children} </OrgContext.Provider>
}