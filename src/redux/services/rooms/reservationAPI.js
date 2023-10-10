import { Delete } from '@mui/icons-material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const reservationAPI = createApi({
    reducerPath: 'reservationAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    endpoints: (builder) => ({
        getReserv: builder.query({
            query: ()=>'roomsAPI/reservation/',
            providesTags: 'reservData',
        }),

        reservation: builder.mutation({
            query: (data) => ({
                url: 'roomsAPI/reservation/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data,

            }),
            invalidatesTags: ['RoomReserv'],
        }),
        updateReserv: builder.mutation ({
            query: ( id, entry_date, exit_date, persons_number, reservatore, room ) => ({
                url: `roomsAPI/reservation/${id}/`,
                // url: `roomsAPI/reservation/${id}/`,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: {  entry_date, exit_date, persons_number, reservatore, room },
            }),
            invalidatesTags: ['RoomReserv'],
        }),
        deleteReserv: builder.mutation({
            query: (id)=>({
                url:`roomsAPI/delete-reservation/${id}`,
                method: Delete,
            }),
            invalidatesTags: ['RoomReserv'],
        })
        
    }),
});

export const { useReservationMutation, useGetReservQuery, useUpdateReservMutation, useDeleteReservMutation } = reservationAPI;