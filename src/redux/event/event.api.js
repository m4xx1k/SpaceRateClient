import {api} from "../api.js";

export const eventApi = api.injectEndpoints({
    endpoints: builder => ({
        findAllCinemas: builder.query({
            query: () => 'event/',
            providesTags: ['Event']
        }),
        getPremieres: builder.query({
            query: () => 'event/getPremieres',
            providesTags: ['Event']
        }),
        getMoviesWithShowtimes: builder.query({
            query: () => 'event/getMoviesWithShowtimes',
            providesTags: ['Event']
        }),
        getCinemaFullInfoById: builder.query({
            query: id => `event/getCinemaFullInfoById/${id}`,
            providesTags: ['Event']
        }),
        getMovieFullInfoById: builder.query({
            query: ({id, telegramId}) => ({
                url: `event/getMovieFullInfoById/${id}`,
                method: "GET",
                params: {telegramId}
            }),

            providesTags: ['Event']
        }),
        findAllEventTypes: builder.query({
            query: () => 'event/findAllEventTypes',
            providesTags: ['EventType']
        }),
        getEventsWithShowtimesByTypeId: builder.query({
            query: id => `event/getEventsWithShowtimesByTypeId/${id}`,
            providesTags: ['Event']
        }),
        getEventFullInfoById: builder.query({
            query: ({id, telegramId}) => ({
                url: `event/getEventFullInfoById/${id}`,
                method: "GET",
                params: {telegramId}
            }),
            providesTags: ['Event']
        }),


        userEventFavourites: builder.query({
            query: id => `event/favourites/${id}`,
            providesTags: ['Favourite']

        }),
        favouriteCount: builder.query({
            query: id => `event/favourite_count/${id}`,
            providesTags: ['Favourite']

        }),
        fetchAllEventRatings: builder.query({
            query: body => ({
                url: 'event/ratings',
                params: {...body}
            }),
            providesTags: ['Rating']
        }),
        rateEvent: builder.mutation({
            query: body => ({
                url: `event/rate`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']
        }),
        findUserEventRating: builder.mutation({
            query: body => ({
                url: `event/user_rating`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']

        }),
        toggleFavouriteEvent: builder.mutation({
            query: body => ({
                url: `event/favourite`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Favourite']

        }),

        findEventImages: builder.query({
            query: id => ({
                url: `event/findEventImages`,
                params: {id}
            }), providesTags: ['Category', 'Event']
        }),
    })
})

export const {
    useLazyFindEventImagesQuery,
    useToggleFavouriteEventMutation,
    useFindUserEventRatingMutation,
    useRateEventMutation,
    useFetchAllEventRatingsQuery,
    useFavouriteCountQuery,
    useUserEventFavouritesQuery,

    useGetEventFullInfoByIdQuery,
    useGetEventsWithShowtimesByTypeIdQuery,
    useFindAllEventTypesQuery,
    useGetMovieFullInfoByIdQuery,
    useGetPremieresQuery,
    useGetCinemaFullInfoByIdQuery,
    useGetMoviesWithShowtimesQuery,
    useFindAllCinemasQuery
} = eventApi
