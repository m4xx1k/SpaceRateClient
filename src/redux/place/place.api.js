import {api} from "../api.js";

export const placeApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAllPlaces: builder.query({
            query: () => 'place',
            providesTags: ['Place']
        }),
        fetchMainAdvertisements: builder.query({
            query: () => 'advertisement',
            providesTags: ['Place']
        }),
        fetchByIdPlace: builder.query({
            query: ({id, telegramId}) => ({
                url: `place/findById/${id}`,
                params: {telegramId}
            }),
            providesTags: ['Place']

        }),
        fetchByCategory: builder.query({
            query: id => `place/category/${id}`,
            providesTags: ['Category', 'Place']
        }),
        findPlaceMainById: builder.query({
            query: ({id, telegramId}) => ({
                url: `place/findPlaceMainById`,
                params: {placeId: id, telegramId}
            }), providesTags: ['Category', 'Place']
        }),
        findAllPlacesMainByCategoryId: builder.query({
            query: params => ({
                url: `place/findAllPlacesMainByCategoryId`,
                params
            }), providesTags: ['Category', 'Place']
        }),
        findPlaceInfos: builder.query({
            query: id => ({
                url: `place/findPlaceInfos`,
                params: {id}
            }),
            providesTags: ['Category', 'Place']
        }),
        findPlaceImages: builder.query({
            query: id => ({
                url: `place/findPlaceImages`,
                params: {id}
            }), providesTags: ['Category', 'Place']
        }),
        createPlace: builder.mutation({
            query: body => ({
                url: 'place',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Place']
        }),
        userFavourites: builder.query({
            query: id => `place/favourites/${id}`,
            providesTags: ['Favourite']

        }),
        fetchCountRatings: builder.query({
            query: id => ({
                url: `place/countratings/${id}`,
            }),
            providesTags: ['Rating']

        }),
        favouriteCount: builder.query({
            query: id => `place/favourite_count/${id}`,
            providesTags: ['Favourite']

        }),
        fetchAllRatings: builder.query({
            query: body => ({
                url: 'place/ratings',
                params: body
            }),
            providesTags: ['Rating']
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
            invalidatesTags: ['Favourite']

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
    useFetchAllRatingsQuery,
    useFindUserPlaceRatingMutation,
    useLazyFetchByCategoryQuery,
    useFetchMainAdvertisementsQuery,
    useFindPlaceImagesQuery,
    useLazyFindPlaceImagesQuery,
    useFindPlaceMainByIdQuery,
    useFindPlaceInfosQuery,
    useFindAllPlacesMainByCategoryIdQuery,
    useFetchByCategoryQuery,
    useRatePlaceMutation,
    useFetchByIdPlaceQuery,
    useFavouriteCountQuery,
    useFetchCountRatingsQuery
} = placeApi
