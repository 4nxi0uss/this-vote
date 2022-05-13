import { configureStore } from '@reduxjs/toolkit'
import usersLoginSlice from '../Slice/accountSlice'
import thunkMiddleware from 'redux-thunk';
import postPollsSlice from '../Slice/postPollsSlice';
import registerSlice from '../Slice/registerSlice';
import usersGetPolls from '../Slice/getPollSlice';
import usersPutPoll from '../Slice/voteSlice';
import deletePoll from '../Slice/deletingPollSlice';
import editPollSlice from '../Slice/editPollSlice';

export const store = configureStore({
  reducer: {
    users: usersLoginSlice,
    polls: postPollsSlice,
    getPolls: usersGetPolls,
    putPoll: usersPutPoll,
    register: registerSlice,
    delete: deletePoll,
    edit: editPollSlice,
  },
  middleware: [thunkMiddleware]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch