import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (newOrder) => {
                console.log('newOrder:', newOrder); // Log the newOrder object
                return {
                    url: 'foodsAPI/order/',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: newOrder,
                };
            },
            invalidatesTags: ['Order'],
        }),
    })
})
export const { useAddOrderMutation, } = orderAPI;



