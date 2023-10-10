import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodAPI = createApi({ 
    reducerPath: 'foodAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        getFood: builder.query({
            query: ()=>'foodsAPI/foods/',
            providesTags: ['foods'],
        }),
    })
})
export const {useGetFoodQuery,} = foodAPI;

