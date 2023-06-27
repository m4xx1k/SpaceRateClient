import {api} from "../api.js";

export const placeApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllPlaces: builder.query({
            query: () => 'place',
            providesTags: ['Place']
        }),
        fetchAllRatings: builder.mutation({
            query: body => ({
                url: 'place/ratings',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']
        }),
        fetchByIdPlace: builder.query({
            query: ({id, telegramId}) => ({
                url: `place/${id}`,
                params: {telegramId}
            }),
            providesTags: ['Place']

        }),
        favouriteCount: builder.query({
            query: id => `place/favourite_count/${id}`,
            providesTags: ['Place']

        }),
        userFavourites: builder.query({
            query: id => `place/favourites/${id}`,
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
        ratePlace: builder.mutation({
            query: body => ({
                url: `place/rate`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']
        }),
        findUserPlaceRating: builder.mutation({
            query: body => ({
                url: `place/user_rating`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']

        }),
        toggleFavouritePlace: builder.mutation({
            query: body => ({
                url: `place/favourite`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']

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
    useUserFavouritesQuery,
    useToggleFavouritePlaceMutation,
    useFetchAllRatingsMutation,
    useFindUserPlaceRatingMutation,
    useLazyFetchByCategoryQuery,
    useRatePlaceMutation,
    useFetchByIdPlaceQuery,
    useFavouriteCountQuery,
    useRemoveMutation
} = placeApi
