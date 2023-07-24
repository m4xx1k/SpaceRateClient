import {api} from "../api.js";

export const eventApi = api.injectEndpoints({
    endpoints: builder => ({
        findAllCinemas: builder.query({
            query: () => 'event/',
            providesTags: ['Place']
        }),
        getPremieres: builder.query({
            query: () => 'event/getPremieres',
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
        findAllEventTypes: builder.query({
            query:()=>'event/findAllEventTypes',
            providesTags:['EventType']
        }),
        getEventsWithShowtimesByTypeId:builder.query({
            query:id=>`event/getEventsWithShowtimesByTypeId/${id}`,
            providesTags:['Event']
        }),
        getEventFullInfoById:builder.query({
            query:id=>`event/getEventFullInfoById/${id}`,
            providesTags:['Event']
        }),

    })
})

export const {useGetEventFullInfoByIdQuery,useGetEventsWithShowtimesByTypeIdQuery,useFindAllEventTypesQuery,useGetMovieFullInfoByIdQuery,useGetPremieresQuery,useGetCinemaFullInfoByIdQuery,useGetMoviesWithShowtimesQuery,useFindAllCinemasQuery,} = eventApi
