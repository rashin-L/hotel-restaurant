import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const roomAPI = createApi({ 
    reducerPath: 'roomAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        getRoom: builder.query({
            query: ()=>'/roomsAPI/rooms/',
            providesTags: 'rooms',
        }),

        addLike: builder.mutation({
            query: (newLike) => ({
                url: '/roomsAPI/rooms/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newLike
            }),
            invalidatesTag: ['Likes'],
        }),
    })
})
export const {useGetRoomQuery, useAddLikeMutation} = roomAPI;

