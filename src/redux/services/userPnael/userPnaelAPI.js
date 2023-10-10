import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userPnaelAPI = createApi({ 
    reducerPath: 'cartAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (userId) => `accounts/UserCartAPI/${userId}`,
            providesTags: ['cart'],
        }),
    })
})
export const {useGetCartQuery,} = userPnaelAPI;

