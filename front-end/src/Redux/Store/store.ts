import { configureStore } from '@reduxjs/toolkit'
import usersLoginSlice from '../Slice/usersLoginSlice'
import postPollsSlice from '../Slice/postPollsSlice';
import registerSlice from '../Slice/registerSlice';
import usersGetPolls from '../Slice/getPollSlice';
import usersPutPoll from '../Slice/voteSlice';
import deletePoll from '../Slice/deletingPollSlice';
import editPollSlice from '../Slice/editPollSlice';
import GetUserDataSlice from '../Slice/GetUserDataSlice';
import usersUpdateSlice from '../Slice/userUpdateSlice';
import { pollApi } from '../Services/PollApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from '../Services/UserApi';

export const store = configureStore({
  reducer: {
    usersLogin: usersLoginSlice,
    userData: GetUserDataSlice,
    userUpdate: usersUpdateSlice,
    registerUser: registerSlice,
    addPolls: postPollsSlice,
    getPolls: usersGetPolls,
    putPoll: usersPutPoll,
    deletePoll: deletePoll,
    editPoll: editPollSlice,
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