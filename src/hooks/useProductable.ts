import { API_ROUTE_V } from "api/_api";
import { ParamsProductable } from "params-query/param.interface";
import { useFetchInfinite } from "./useFetchInfinite";
import {  uniqueArray } from "utils";
import { useMemo } from "react";
import { IOrganization, Productable } from "interface";

export interface ProductableGroup {
    organization: IOrganization;
    productables: Productable[]
}

export function useProductable(
    type: '1' | '2' | '3' | '4',
    params: ParamsProductable,
    condition: boolean
) {
    const { resDataV2, totalItemV2, totalPageV2, onLoadMore, isValidating } = useFetchInfinite(
        condition, API_ROUTE_V.PRODUCTABLE('v3'), { ...params, type: type }
    )
    const productableGroup = useMemo(() => {
        const uniqueOrgs = uniqueArray(resDataV2.map((p) => p.organization_id));
        return uniqueOrgs
            .map((org_id) => {
                const organization = resDataV2.find((p) => p.organization_id === org_id)?.organization[0];
                if (!organization) return null;
                return {
                    organization,
                    productables: resDataV2.filter((p) => p.organization_id === org_id),
                };
            }).filter(Boolean) as ProductableGroup[];
    }, [resDataV2])
    const serviceData = {
        productable: resDataV2,
        totalItem: totalItemV2,
        totalPage: totalPageV2,
        onLoadMore: onLoadMore,
        isLoad: isValidating,
        productableGroup
    }
    const productData = {
        productable: resDataV2,
        totalItem: totalItemV2,
        totalPage: totalPageV2,
        onLoadMore: onLoadMore,
        isLoad: isValidating
    }
    return { serviceData, productData }
}