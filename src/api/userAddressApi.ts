import { axiosClient } from "config";
import provincesApi from "./provinceApi";
import { IProvince } from "interface";

class UserAddress {
    getAll = () => {
        const url = `/useraddresses`;
        return axiosClient.get(url, { params: { limit: 15, page: 1 } })
    }
    postAddress = (values: any) => {
        const url = `/useraddresses`;
        const params = {
            "address": values.address,
            "is_default": values.is_default,
            "is_bookmark": true
        }
        return axiosClient.post(url, params);
    }

    deleteAddress = (id: number | string) => {
        const url = `/useraddresses/${id}`;
        return axiosClient.delete(url);
    }
    updateAddress = (values: { id: number | string, body:{address?:string, is_default?:boolean} }) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.body.address,
            "is_default": values.body.is_default,
        }
        return axiosClient.put(url, params);
    }
    updateAddressCancelDefault = (values: any) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.address,
            "is_default": false
        }
        return axiosClient.put(url, params);
    }
    getProvinceCodeFromAddress = async (address: string) => {
        let province_data, district_data, ward_data
        const provinces = await provincesApi.getProvinces().then(res => res.data.context.data)
        const addressArray = address.split(',').reverse()
        const provinceName = addressArray[0]
        const districtName = addressArray[1]
        const wardName = addressArray[2]
        const addressText = addressArray[3] || ''
        const province = provinces.find((i: IProvince) => i.name === provinceName.trim())
        if (province) {
            province_data = province
            const districts = await provincesApi.getDistricts(province_data.province_code).then(res => res.data.context.data)
            const district = districts.find((i: any) => i.name === districtName.trim())
            if (district) {
                district_data = district
                const wards = await provincesApi.getWards(district_data.district_code)?.then(res => res.data.context.data)
                const ward = wards.find((i: any) => i.name === wardName.trim())
                if (ward) {
                    ward_data = ward
                }
            }
        }
        return { province_data, district_data, ward_data, addressText }

    }
}
const userAddressApi = new UserAddress();
export default userAddressApi;