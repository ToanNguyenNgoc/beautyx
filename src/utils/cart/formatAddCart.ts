export const formatAddCart = (
    item: any,
    org: any,
    is_type: any,
    quantity: any,
    sale_price: any,
    discount?: any
) => {

    const cartValues = {
        id: item?.id,
        org_id: org.id,
        org_name: org.name,
        cart_id: parseInt(`${is_type}${org.id}${item?.id}`), //is_type + org_id + id
        name: item?.product_name ? item?.product_name : item?.service_name,
        quantity: quantity,
        is_type: is_type,
        isConfirm: false,
        price: sale_price,
        price_discount: discount ? discount.items[0].view_price : null,
        org: org,
        cart_item: item,
        discount: discount ? discount : null
    }
    return cartValues;
}