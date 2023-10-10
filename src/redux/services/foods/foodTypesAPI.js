import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodTypesAPI = createApi({ 
    reducerPath: 'foodTypesAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        getFoodTypes: builder.query({
            query: ()=>'foodsAPI/food-types/',
            providesTags: ['foodTypes'],
        }),

    })
})
export const {useGetFoodTypesQuery,} = foodTypesAPI;

