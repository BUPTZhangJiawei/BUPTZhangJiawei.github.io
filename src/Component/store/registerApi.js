import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const registerApi = createApi({
    reducerPath:"registerApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://10.129.84.61:1337/api"
    }),
    endpoints(build){
        return {
            registerUser:build.mutation({
                query(userInfo){
                    return {
                        url:"user-lists",
                        method:"POST",
                        body:{data:userInfo}
                    }
                }
            })
        }
    }
})

export const {useRegisterUserMutation} = registerApi;

export default registerApi;