import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

let userIdD = ''

const mutex = new Mutex()

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3022/polls/' })
    // wait until the mutex is available without locking it

    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const previousArgs = args
    const previousApi = api
    const previousExtraOptions = extraOptions

    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const refreshResult = await baseQuery(
                    args = {
                        url: 'http://localhost:3022/users/refreshToken',
                        method: 'POST',
                        credentials: 'include',
                        body: { userId: userIdD }
                    },
                    api,
                    extraOptions
                )

                if (refreshResult.data) {
                    // retry the initial query
                    result = await baseQuery(previousArgs, previousApi, previousExtraOptions)
                } else {
                    console.warn('re auth api else', refreshResult.error)
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
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Poll'],
    endpoints: (builder) => ({
        getAllPolls: builder.query<any, void>({
            query: () => (
                {
                    url: `getAllPolls`,
                    method: "GET"
                }),
        }),
        getPolls: builder.query<any, number>({
            query: (creatorId) => {
                userIdD = `${creatorId}`;
                return {
                    url: `getPolls/${creatorId}`,
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