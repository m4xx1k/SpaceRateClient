import {api} from "../api.js";

export const placeApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllPlaces: builder.query({
            query: () => 'place',
            providesTags: ['Place']
        }),
        fetchByIdPlace: builder.query({
            query: id => `place/${id}`,
            providesTags: ['Place']

        }),
        fetchByCategory: builder.query({
            query: id => `place/category/${id}`,
            providesTags: ['Category', 'Place']
        }),
        createPlace: builder.mutation({
            query: body => ({
                url: 'place',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Place']
        }),
        updatePlace: builder.mutation({
            query: ({id, body}) => ({
                url: `place/${id}`,
                method: 'PUT',
                body
            })

        }),
        removePlace: builder.mutation({
            query: ({id}) => ({
                url: `place/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Place']
        })
    })
})

export const {
    useCreatePlaceMutation,
    useFetchByCategoryQuery,
    useFetchAllPlacesQuery,
    useFetchByIdPlaceQuery,
    useUpdateMutation,
    useRemoveMutation
} = placeApi
