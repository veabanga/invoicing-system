import { apiSlice } from './apiSlice.js'
import { ORDERS_URL } from '../constants.js'

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
            }),
            keepUnusedFor: 5,
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
              url: `${ORDERS_URL}/myorders/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
})

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderDetailsQuery } = ordersApiSlice;