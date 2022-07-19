import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { infoLoginType, infoUpdate, registerDataType, registerInfo } from '../ReduxTypes/reduxTypes'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

let localUserId = ''

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3022/users/' })
const baseQueryWithReauthUser: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it

    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const previousArgs = args
    const previousApi = api
    const previousExtraOptions = extraOptions

    if (result?.error?.status === 401) {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                let refreshResult
                if (Boolean(localUserId)) {
                    refreshResult = await baseQuery(
                        // const refreshResult = await baseQuery(
                        args = {
                            url: '/refreshToken',
                            method: 'POST',
                            credentials: 'include',
                            body: { userId: localUserId }
                        },
                        api,
                        extraOptions
                    )
                }

                if (Boolean(localUserId) && Boolean(refreshResult?.data)) {
                    // retry the initial query
                    result = await baseQuery(previousArgs, previousApi, previousExtraOptions)
                }
                // else {
                //     console.warn('re auth api else user', refreshResult?.error)
                // }
            } catch (err) {
                console.warn(err)
            } finally {
                // release must be called once the mutex should be released again.
                console.log('ok')
                await release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            console.log(6, args, api, extraOptions)
            result = await baseQuery(args, api, extraOptions)
        }
    }
    // console.log(8, result)
    return result
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauthUser,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        //userData
        getUserData: builder.query<any, number>(
            {
                query: (userId) => {
                    localUserId = `${userId}`;
                    return {
                        url: `getUserData/${userId}`,
                        method: "GET",
                        credentials: "include",
                    }
                },
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
        userRegistery: builder.mutation<registerInfo, registerDataType>(
            {
                query: ({ email, password }) => (
                    {
                        url: "register",
                        method: 'POST',
                        body: {
                            usersEmail: email,
                            pass: password
                        },
                    }),
            }),
        userRefreshToken: builder.mutation<any, string>(
            {
                query: (userId) => ({
                    url: "refreshToken",
                    method: 'POST',
                    credentials: 'include',
                    body: { userId },
                }),
            }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation, useUserRegisteryMutation, useUserActiveMutation, useUserLogoutMutation, useUserRefreshTokenMutation } = userApi