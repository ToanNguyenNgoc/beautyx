import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bannerApi from "api/bannerApi";
import provincesApi from "api/provinceApi";
import tagsApi from "api/tagApi";
import { STATUS } from "../status";

export const fetchAsyncHome: any = createAsyncThunk(
    "HOME/fetchAsyncHome",
    async () => {
        const res_banners = await bannerApi.getAll();
        let tags = []
        let provinces = []
        try {
            tags = JSON.parse(`${localStorage.getItem('tags')}`) || []
            provinces = JSON.parse(`${localStorage.getItem('provinces')}`) || []
        } catch (error) {
            tags = []
        }
        if (tags.length === 0 || provinces.length === 0) {
            const res_tags = await tagsApi.getAll();
            tags = res_tags.data.context.data
            const res_provinces = await provincesApi.getAll();
            localStorage.setItem('tags', JSON.stringify(res_tags.data.context.data))
            localStorage.setItem('provinces', JSON.stringify(res_provinces.data.context.data))
        }
        const payload = {
            banners: await res_banners.data.context.data,
            provinces: provinces,
            provinces_org: provinces.filter(
                (item: any) => item.organizations_count > 0
            ),
            tags: tags,
        };
        return payload;
    }
);
const initialState = {
    banners: [],
    tags: [],
    provinces_org: [],
    provinces: [],
    status: STATUS.LOADING,
}
const homeSlice = createSlice({
    name: "HOME",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAsyncHome.pending, (state) => { return state })
        builder.addCase(fetchAsyncHome.fulfilled, (state, { payload }) => {
            return {
                ...state,
                ...payload,
                status: STATUS.SUCCESS,
            };
        })
        builder.addCase(fetchAsyncHome.rejected, (state) => {
            return { ...state, status: STATUS.FAIL }
        })
    },
});
export default homeSlice.reducer;
