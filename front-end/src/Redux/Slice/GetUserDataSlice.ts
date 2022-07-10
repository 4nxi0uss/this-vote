import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FAILED_STATUS, SUCCESS_STATUS, LOADING_STATUS, infoUpdate, IDLE_STATUS } from '../ReduxTypes/reduxTypes';

// Define the initial state using that type
const initialState: any = {
    statusUserData: IDLE_STATUS,
    userData: {
        message: 'próba zaciągnięcia danych z bazy',
        data: [
            {
                id: Number(),
                user_id: '',
                name: '',
                surname: '',
                date_of_birth: '',
                type_of_account: Number(),
                active: Number(),
                polls: '',
            }],
        error: ''
    },
}

export const fetchGetUserData = createAsyncThunk("users/getUserData", async (userId: infoUpdate) => {

    try {
        const data = await fetch(`http://localhost:3022/users/getUserData/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
        const result = data.json();
        return await result;
    } catch (error) {
        throw await error
    }
})

export const GetUserDataSlice = createSlice({
    name: 'usersData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(fetchGetUserData.pending, (state) => {
            state.statusUserData = LOADING_STATUS
        })
        builder.addCase(fetchGetUserData.fulfilled, (state, action: PayloadAction<{ message: string, data: any, error: any }>) => {
            state.userData = action.payload
            state.statusUserData = SUCCESS_STATUS
        })
        builder.addCase(fetchGetUserData.rejected, (state) => {
            state.statusUserData = FAILED_STATUS
        })
    },
})

// export const {  } = GetUserDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default GetUserDataSlice.reducer