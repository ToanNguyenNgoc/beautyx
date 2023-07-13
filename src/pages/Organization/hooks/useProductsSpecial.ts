import { IOrganization } from "interface";
import { useGetProductsSpecialOrgQuery } from "redux-toolkit-query/hook-org";

export const useProductsSpecial=(org: IOrganization)=> {
    const { data, isLoading } = useGetProductsSpecialOrgQuery(org.id)
    const products_special = data ?? []
    const loadProducts = isLoading
    return { products_special, loadProducts }
}