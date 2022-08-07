import { configureStore } from '@reduxjs/toolkit'
import PaginationSlice from '../Slice/PaginationSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { pollApi } from '../Services/PollApi';
import { userApi } from '../Services/UserApi';

export const store = configureStore({
  reducer: {
    pagination: PaginationSlice,
    [pollApi.reducerPath]: pollApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(
      pollApi.middleware,
      userApi.middleware
    )
  )
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch