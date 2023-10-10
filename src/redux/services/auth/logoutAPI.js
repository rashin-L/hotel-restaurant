import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logoutAPI = createApi({
    reducerPath: 'logoutAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        logoutUser: builder.query({
            query: ()=>'accounts/LogoutUserAPI/',
            providesTags: ['logout'],
        }),


    })
})
export const { useLogoutUserQuery } = logoutAPI;

