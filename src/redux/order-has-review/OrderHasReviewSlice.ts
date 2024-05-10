import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  ordersHasReview: number[]
}

const OrderHasReviewSlice = createSlice({
  name: 'ORDER_HAS_REVIEW',
  initialState: {
    ordersHasReview: []
  } as InitialState,
  reducers: {
    onSetOrderHasReview: (state, { payload }: { payload: number[] }) => {
      state.ordersHasReview = payload
    },
    onUpdateOrderReviewed: (state, { payload }: { payload: number }) => {
      state.ordersHasReview = [...state.ordersHasReview, payload]
    }
  }
})

const { actions, reducer } = OrderHasReviewSlice
export const {
  onSetOrderHasReview,
  onUpdateOrderReviewed
} = actions

export default reducer