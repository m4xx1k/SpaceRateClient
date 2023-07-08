import {api} from "../api.js";

export const categoryApi = api.injectEndpoints({
    endpoints: builder=>({
        fetchAll:builder.query({
            query:()=>'category',
            providesTags:['Category']
        }),
        fetchAdvertisements:builder.query({
            query:id=>`categoryAdvertisement/${id}`,
            providesTags:['Advertisement']
        }),

        create: builder.mutation({
            query: body =>({
                url:'category',
                method:'POST',
                body
            }),
            invalidatesTags:['Category']
        }),
        update:builder.mutation({
            query:({id,body})=>({
                url:`category/${id}`,
                method:'PUT',
                body
            })

        }),
        remove:builder.mutation({
            query:({id})=>({
                url:`category/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Category']
        }),
        findCategoryById:builder.query({
            query:id=>`category/${id}`
        })
    })
})

export const { useFindCategoryByIdQuery, useFetchAllQuery,useFetchAdvertisementsQuery, useRemoveMutation} = categoryApi
