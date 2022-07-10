import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3022/polls/' }),
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
            query: (creatorId) => (
                {
                    url: `getPolls/${creatorId}`,
                    method: "GET",
                    credentials: "include",
                }),
            providesTags: ["Poll"],
        }),
        addPoll: builder.mutation<any, any>({
            query: ({ name, question, number, option, userId, token }) => (
                {
                    url: "postPolls/",
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