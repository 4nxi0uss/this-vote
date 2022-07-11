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
                    method: "GET",
                    credentials: "include",
                }),
                providesTags: ["User"],
            }),
        //infoUpdate
        updateUserInfo: builder.mutation<any, infoUpdate>(
            {
                query: (infoUpdate) => ({
                    url: "infoUpdate",
                    method: 'PATCH',
                    credentials: "include",
                    body: infoUpdate,
                }),
                invalidatesTags: ["User"]
            }),
        //active user account
        userActive: builder.mutation<any, string>(
            {
                query: (userId) => ({
                    url: "active",
                    method: 'PATCH',
                    credentials: 'include',
                    body: { userId },
                }),
                invalidatesTags: ["User"]
            }),
        //infoLogin
        userLogin: builder.mutation<any, infoLoginType>(
            {
                query: (loginData) => ({
                    url: "login",
                    method: 'POST',
                    credentials: 'include',
                    body: loginData,
                }),
            }),
        userLogout: builder.mutation<any, string>(
            {
                query: (userId) => ({
                    url: "logout",
                    method: 'POST',
                    credentials: 'include',
                    body: { userId },
                }),
            }),
        //registerInfo
        userRegistery: builder.mutation<registerInfo, registerDataType>({
            query: ({ email, password }) => (
                {
                    url: "register",
                    method: 'POST',
                    body: {
                        usersEmail: email,
                        pass: password
                    },
                }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation, useUserRegisteryMutation, useUserActiveMutation, useUserLogoutMutation } = userApi