import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/accounts/RegisterUser/',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newUser,
                credentials: "include"
                // formData:true 
            }),
            invalidatesTags: ['users'],
        }),


    })
})
export const { useCreateUserMutation } = registerAPI;

