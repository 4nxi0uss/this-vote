import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3022/users/' }),
    tagTypes: ['Poll'],
    endpoints: (builder) => ({
        getPolls: builder.query<any, number>({
            query: (creatorId) => ({
                url: `getPolls/${creatorId}`,
                method: "GET"
            }),
            providesTags: ["Poll"],
        }),
        addPoll: builder.mutation<any, any>({
            query: (pollsData) => ({
                url: "postPolls/",
                method: "POST",
                body: pollsData,
            }),
            invalidatesTags: ["Poll"],
        }),
        updatePollValue: builder.mutation<any, any>({
            query: ({ id, optionId }) => (
                {
                    url: "putPoll",
                    method: "PUT",
                    body: {
                        id,
                        optionId,
                    }
                }),
            invalidatesTags: ["Poll"],
        }),
        deletePoll: builder.mutation<any, any>({
            query: (delData) => ({
                url: "deletePoll",
                method: "DELETE",
                body: delData,
            }),
            invalidatesTags: ["Poll"],
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPollsQuery, useAddPollMutation, useDeletePollMutation, useUpdatePollValueMutation } = pollApi