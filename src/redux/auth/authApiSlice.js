import {api} from "../api.js";

export const authApiSlice = api.injectEndpoints({
    endpoints: builder=>({
        findUser: builder.mutation({
            query: body =>({
                url:'user/find',
                method:'POST',
                body
            })
        }),
        registration:builder.mutation({
            query:body=>({
                url:'user/register',
                method:'POST',
                body
            })
        })


    })
})

export const { useFindUserMutation,useRegistrationMutation} = authApiSlice
