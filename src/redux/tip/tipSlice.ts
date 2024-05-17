import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tipsApi from "api/tipApi";
import { ITip } from "interface";
import { STATUS } from "redux/status";
const initTip = {
    id: 0,
    name: "",
    type: null,
    type_id: null,
    status: null,
    priority: null,
    user_id: null,
    created_at: "",
    updated_at: "",
};
export const fetchAsyncTip: any = createAsyncThunk(
    "TIP/fetchAsyncTip",
    async () => {
        try {
            const res = await tipsApi.getAll();
            const payload = res;
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchAsyncTipDetail: any = createAsyncThunk(
    "TIP/fetchAsyncTipDetail",
    async (id: number) => {
        try {
            const res = await tipsApi.getById(id);
            return {
                ...initTip,
                ...res.context,
            };
        } catch (error) {
            console.log(error);
        }
    }
);
interface res {
    page: number;
    data: ITip[];
    totalItem: number;
}
interface ITipsDetail {
    tip: ITip;
    status: string;
}
export interface ITipsState {
    tip: res;
    status: string;
    tipDetail: ITipsDetail;
}
const initialState: ITipsState = {
    tip: {
        page: 0,
        data: [initTip],
        totalItem: 0,
    },
    status: "",
    tipDetail: {
        tip: initTip,
        status: "",
    },
};
const tipSlice = createSlice({
    name: "TIP",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncTip.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchAsyncTip.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                tip: {
                    ...state.tip,
                    page: payload.current_page,
                    data: payload.data,
                    total: payload.total,
                },
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncTip.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },
        // get detail tips
        [fetchAsyncTipDetail.pending]: (state) => {
            return {
                ...state,
                tipDetail: {
                    ...state.tipDetail,
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsyncTipDetail.fulfilled]: (state, payload) => {
            return {
                ...state,
                tipDetail: {
                    tip: payload,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncTipDetail.rejected]: (state) => {
            return {
                ...state,
                tipDetail: {
                    ...state.tipDetail,
                    status: STATUS.FAIL,
                },
            };
        },
    },
});
const { actions } = tipSlice;
export const {} = actions;
export default tipSlice.reducer;
