import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { Login, InfoUpdateUserData, RegisterDataType, RegisterInfo, UserLogin, UserData } from '../ReduxTypes/reduxTypes'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

let localUserId = ''

const mutex = new Mutex()

const host = 'thisvote.bieda.it'
const port = 80

const baseQuery = fetchBaseQuery({ baseUrl: `http://${host}:${port}/users/` })
const baseQueryWithReauthUser: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it

    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const previousArgs = args
    const previousApi = api
    const previousExtraOptions = extraOptions

    if (result?.error?.status === 404) {
        window.location.assign('/not-found')
    }

    if (result?.error?.status === 401) {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                let refreshResult
                if (Boolean(localUserId)) {
                    refreshResult = await baseQuery(
                        args = {
                            url: '/refresh-token',
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

            } catch (err) {
                console.warn(err)
            } finally {
                // release must be called once the mutex should be released again.
                await release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauthUser,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        //userData
        getUserData: builder.query<UserData, string>(
            {
                query: (userId) => {
                    localUserId = `${userId}`;
                    return {
                        url: `get-user-data/${userId}`,
                        method: "GET",
                        credentials: "include",
                    }
                },
                providesTags: ["User"],
            }),
        //infoUpdate
        updateUserInfo: builder.mutation<{ message: string }, InfoUpdateUserData>(
            {
                query: (infoUpdate) => ({
                    url: "info-update",
                    method: 'PATCH',
                    credentials: "include",
                    body: infoUpdate,
                }),
                invalidatesTags: ["User"]
            }),
        //infoLogin
        userLogin: builder.mutation<UserLogin, Login>(
            {
                query: (loginData) => ({
                    url: "login",
                    method: 'POST',
                    credentials: 'include',
                    body: loginData,
                }),
            }),
        userLogout: builder.mutation<{ message: string }, string>(
            {
                query: (userId) => ({
                    url: "logout",
                    method: 'POST',
                    credentials: 'include',
                    body: { userId },
                }),
            }),
        //registerInfo
        userRegistery: builder.mutation<RegisterInfo, RegisterDataType>(
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
                    url: "refresh-token",
                    method: 'POST',
                    credentials: 'include',
                    body: { userId },
                }),
            }),
        changeUserAccountType: builder.mutation<{ message: string }, { typeAccount: number, email: string }>(
            {
                query: ({ typeAccount, email }) => ({
                    url: `change-account-type`,
                    method: "PATCH",
                    credentials: "include",
                    body: {
                        typeAccount,
                        email
                    }
                }),
            }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDataQuery, useUpdateUserInfoMutation, useUserLoginMutation, useUserRegisteryMutation, useUserLogoutMutation, useUserRefreshTokenMutation, useChangeUserAccountTypeMutation } = userApi