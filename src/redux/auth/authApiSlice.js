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
        }),
        userEntrance:builder.mutation({
            query:body=>({
                url:'user/userEntrance',
                method:'POST',
                body
            })
        })


    })
})

export const { useFindUserMutation,useUserEntranceMutation,useRegistrationMutation} = authApiSlice
