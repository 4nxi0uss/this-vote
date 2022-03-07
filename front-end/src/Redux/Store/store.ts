import { configureStore } from '@reduxjs/toolkit'
import usersLoginSlice from '../Slice/accountSlice'
import thunkMiddleware from 'redux-thunk';
import usersPolls from '../Slice/postPollsSlice';
import registerSlice from '../Slice/registerSlice';
import usersGetPolls from '../Slice/getPoolSlice';

export const store = configureStore({
  reducer: {
    users: usersLoginSlice,
    polls: usersPolls,
    getPolls: usersGetPolls,
    register: registerSlice,
  },
  middleware: [thunkMiddleware]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch