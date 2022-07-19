import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

let localUserId = ''

const mutex = new Mutex()

const baseQueryWithReauthPoll: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3022/polls/' })
    // wait until the mutex is available without locking it

    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const previousArgs = args
    const previousApi = api
    const previousExtraOptions = extraOptions

    if (result?.error?.status === 401) {
        // if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                let refreshResult
                if (Boolean(localUserId)) {
                    refreshResult = await baseQuery(
                        args = {
                            url: 'http://localhost:3022/users/refreshToken',
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
                //  else {
                //     console.warn('re auth error polls', refreshResult.error)
                // }
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
    // console.log(88, result)
    return result
}

// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: baseQueryWithReauthPoll,
    tagTypes: ['Poll'],
    endpoints: (builder) => ({
        getAllPolls: builder.query<any, void>({
            query: () => {
                return {
                    url: `getAllPolls`,
                    method: "GET"
                }
            },
        }),
        getPolls: builder.query<any, number>({
            query: (userId) => {
                localUserId = `${userId}`;
                return {
                    url: `getPolls/${userId}`,
                    method: "GET",
                    credentials: "include",
                }
            },
            providesTags: ["Poll"],
        }),
        addPoll: builder.mutation<any, any>({
            query: ({ name, question, number, option, userId, token }) => (
                {
                    url: "postPolls",
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: {
                        name,
                        question,
                        number,
                        option,
                        userId
                    },
                }),
            invalidatesTags: ["Poll"],
        }),
        updatePollValue: builder.mutation<any, any>({
            query: ({ id, optionId }) => (
                {
                    url: "putPoll",
                    method: "PUT",
                    credentials: "include",
                    body: {
                        id,
                        optionId,
                    }
                }),
            invalidatesTags: ["Poll"],
        }),
        updatePollInfo: builder.mutation<any, any>({
            query: ({ name, question, number, option, id }) => (
                {
                    url: "pollUpdate",
                    method: "PATCH",
                    credentials: "include",
                    body: {
                        name,
                        question,
                        number,
                        option,
                        id
                    }
                }),
            invalidatesTags: ["Poll"],
        }),
        deletePoll: builder.mutation<any, any>({
            query: (delData) => (
                {
                    url: "deletePoll",
                    method: "DELETE",
                    credentials: "include",
                    body: delData,
                }),
            invalidatesTags: ["Poll"],
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPollsQuery, useAddPollMutation, useGetAllPollsQuery, useDeletePollMutation, useUpdatePollValueMutation, useUpdatePollInfoMutation } = pollApi