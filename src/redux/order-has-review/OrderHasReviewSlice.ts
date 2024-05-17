import { createSlice } from "@reduxjs/toolkit";

interface IBodyItemOrderReview {
  id: number;
  media_ids: Array<{ model_id: number | null, media_url: string }>;
  body: string
}
interface IPayloadBody {
  id: number;
  media_ids?: Array<{ model_id: number | null, media_url: string }>;
  body?: string
}

interface IBodyOrderReview {
  commentable_id: number;
  organization_id: number;
  products: Array<IBodyItemOrderReview>;
  services: Array<IBodyItemOrderReview>;
  rate: number
}

interface InitialState {
  ordersHasReview: number[],
  bodyComment: IBodyOrderReview
}


const OrderHasReviewSlice = createSlice({
  name: 'ORDER_HAS_REVIEW',
  initialState: {
    ordersHasReview: [],
    bodyComment: {
      commentable_id: 0,
      organization_id: 0,
      products: [],
      services: [],
      rate: 6
    }
  } as InitialState,
  reducers: {
    onSetOrderHasReview: (state, { payload }: { payload: number[] }) => {
      state.ordersHasReview = payload
    },
    onUpdateOrderReviewed: (state, { payload }: { payload: number }) => {
      state.ordersHasReview = [...state.ordersHasReview, payload]
    },
    onInitBody: (state, { payload }: { payload: { services: number[] } }) => {
      state.bodyComment.services = payload.services.map(i => ({ media_ids: [], id: i, body: '' }))
    },
    onChangeRateOrder: (state, { payload }: { payload: number }) => {
      state.bodyComment.rate = payload
    },
    onChangeBodyServiceItemOrder: (state, { payload }: { payload: IPayloadBody }) => {
      const iIndex = state.bodyComment.services.findIndex(i => i.id === payload.id)
      if (iIndex >= 0) {
        if (payload.body || payload.body === "") {
          state.bodyComment.services[iIndex].body = payload.body
        }
        if (payload.media_ids) {
          state.bodyComment.services[iIndex].media_ids = payload.media_ids
        }
      }
    },
    onRemoveMediaServiceOrder: (state, { payload }: { payload: { id: number, model_id: number } }) => {
      const iIndex = state.bodyComment.services.findIndex(i => i.id === payload.id)
      if (iIndex >= 0) {
        const new_medias = state.bodyComment.services[iIndex].media_ids.filter(i => i.model_id !== payload.model_id)
        state.bodyComment.services[iIndex].media_ids = new_medias
      }
    }
  }
})

const { actions, reducer } = OrderHasReviewSlice
export const {
  onSetOrderHasReview,
  onUpdateOrderReviewed,
  onInitBody,
  onChangeRateOrder,
  onChangeBodyServiceItemOrder,
  onRemoveMediaServiceOrder
} = actions

export default reducer