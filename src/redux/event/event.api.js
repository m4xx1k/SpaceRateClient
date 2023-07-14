import {api} from "../api.js";

export const eventApi = api.injectEndpoints({
    endpoints: builder => ({
        findAllCinemas: builder.query({
            query: () => 'event/',
            providesTags: ['Place']
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
            query: id => `event/getMovieFullInfoById/${id}`,
            providesTags: ['Event']
        }),

    })
})

export const {useGetMovieFullInfoByIdQuery,useGetCinemaFullInfoByIdQuery,useGetMoviesWithShowtimesQuery,useFindAllCinemasQuery,} = eventApi
