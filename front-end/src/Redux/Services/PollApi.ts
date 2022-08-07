import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { GetPolls, GetPollsInfo, PaginationType, PaginationTypeForUser, PollsData } from '../ReduxTypes/reduxTypes'

const { REACT_APP_HOST, REACT_APP_PORT } = process.env

let localUserId = ''

const mutex = new Mutex()

const baseQueryWithReauthPoll: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({ baseUrl: `http://${REACT_APP_HOST}:${REACT_APP_PORT}/polls/` })
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
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                let refreshResult
                if (Boolean(localUserId)) {
                    refreshResult = await baseQuery(
                        args = {
                            url: `http://${REACT_APP_HOST}:${REACT_APP_PORT}/users/refresh-token`,
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
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: baseQueryWithReauthPoll,
    tagTypes: ['Poll'],
    endpoints: (builder) => ({
        getAllPolls: builder.query<GetPolls, PaginationType>({
            query: ({ page }) => {
                return {
                    url: `get-all-polls?page=${page}&limit=${5}`,
                    method: "GET"
                }
            },
        }),
        getPolls: builder.query<GetPolls, PaginationTypeForUser>({
            query: ({ userId, page }) => {
                localUserId = `${userId}`;
                return {
                    url: `get-polls/${userId}?page=${page}&limit=${5}`,
                    method: "GET",
                    credentials: "include",
                }
            },
            providesTags: ["Poll"],
        }),
        addPoll: builder.mutation<any, PollsData>({
            query: ({ name, question, number, option, userId }) => (
                {
                    url: "post-polls",
                    method: "POST",
                    credentials: "include",
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
        updatePollValue: builder.mutation<{ message: string }, { id: number, optionId: number }>({
            query: ({ id, optionId }) => (
                {
                    url: "put-poll",
                    method: "PUT",
                    credentials: "include",
                    body: {
                        id,
                        optionId,
                    }
                }),
            invalidatesTags: ["Poll"],
        }),
        updatePollInfo: builder.mutation<GetPollsInfo, { name: string, question: string, number: number, option: object, id: number }>({
            query: ({ name, question, number, option, id }) => (
                {
                    url: "poll-update",
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
        deletePoll: builder.mutation<{ message: string }, { userId: string, id: number }>({
            query: (delData) => (
                {
                    url: "delete-poll",
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