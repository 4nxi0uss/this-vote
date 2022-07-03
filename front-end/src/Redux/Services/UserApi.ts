import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { infoLoginType, infoUpdate, registerDataType, registerInfo } from '../ReduxTypes/reduxTypes'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3022/users/' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        //userData
        getUserData: builder.query<any, number>(
            {
                query: (userId) => ({
                    url: `getUserData/${userId}`,
                    method: "GET"
                }),
                providesTags: ["User"],
            }),
        //infoUpdate
        updateUserInfo: builder.mutation<any, infoUpdate>(
            {
                query: (infoUpdate) => ({
                    url: "infoUpdate",
                    method: 'PATCH',
                    body: infoUpdate,
                }),
                invalidatesTags: ["User"]
            }),
        //infoLogin
        userLogin: builder.mutation<any, infoLoginType>(
            {
                query: (loginData) => ({
                    url: "login",
                    method: 'POST',
                    body: loginData,
                }),
            }),
        userLogin2: builder.query<any, infoLoginType>(
            {
                query: (loginData) => (
                    {
                        url: "login",
                        method: 'POST',
                        body: loginData,
                    }),
            }),
        //registerInfo
        userRegistery: builder.mutation<registerInfo, registerDataType>({
            query: (registerData) => (
                {
                    url: "register",
                    method: 'POST',
                    body: registerData,
                }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation, useUserRegisteryMutation } = userApi