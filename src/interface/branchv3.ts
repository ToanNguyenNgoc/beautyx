export interface IBranchV3 {
    id: number,
    name: string,
    subdomain: string,
    domain: string,
    latitude: number,
    longitude: number,
    telephone: string[],
    address: string,
    min_price: number,
    max_price: number,
    image: string,
    is_momo_ecommerce_enable: boolean,
    is_moba_register_requested: boolean,
    opening_status: boolean,
    opening_time: [{
        from_time_opening: string,
        to_time_opening: string,
        time_opening: "on" | "off"
    }],
    created_at: string,
    updated_at: string,
    province_code: number,
    district_code: number,
    ward_code: number,
    priority: number,
    timezone?: string,
    is_demo: boolean,
    description: string,
    mc_user_id?: number,
    full_address: string,
    image_url: string,
    is_favorite: boolean,
    location: string,
    organization_id: number,
    tags: [{
        id: number,
        name: string,
        parent_id?: number,
        group: string
    }],
    distance?: number //result km
}