import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
    baseUrl:'https://cautious-pumps-toad.cyclic.app',
    // baseUrl:'http://localhost:5001',
    prepareHeaders: (headers) =>{
        const token = localStorage.getItem('token')
        if(!!token) headers.set('authorization', `Bearer ${token}`)
        return headers
    }
})

const baseQueryWithReauth = async (args, api,extraOption)=>{
    let result = await baseQuery(args, api,extraOption)
    if(result?.error?.status === 401){
        // api.dispatch(logoutUser())
        return
    }
    return result
}
export const api = createApi({
    reducerPath:"appApi",
    baseQuery: baseQueryWithReauth,
    tagTypes:['Category',"Place",'Rating'],
    endpoints:build=>({})
})
