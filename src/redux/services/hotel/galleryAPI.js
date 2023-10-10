import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const galleryAPI = createApi({ 
    reducerPath: 'galleryAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    endpoints: (builder) => ({
        getGallery: builder.query({
            query: ()=>'gallery',
            providesTags: ['gallery'],
        }),
    })
})
export const {useGetGalleryQuery,} = galleryAPI;

