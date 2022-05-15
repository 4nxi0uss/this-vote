import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FAILED_STATUS, SUCCESS_STATUS, LOADING_STATUS, infoUpdate, IDLE_STATUS } from '../ReduxTypes/reduxTypes';

// Define the initial state using that type
const initialState: any = {
    statusUpdateInfo: IDLE_STATUS,
    infoUpdate: {
        message: 'tak',
        rows: '',
        error: ''
    }
}

export const fetchUpdateInfo = createAsyncThunk("users/infoUpdate", async (infoUpdate: infoUpdate) => {

    const { userId, name, surname, dateOfBirth } = infoUpdate;

    try {
        const data = await fetch('http://localhost:3022/users/infoUpdate', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: `${userId}`,
                name: `${name}`,
                surname: `${surname}`,
                dateOfBirth: `${dateOfBirth}`,
            })
        })
        const result = data.json();
        return await result;
    } catch (error) {
        throw await error
    }
})

export const usersUpdateSlice = createSlice({
    name: 'userUpdate',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUpdateInfo.pending, (state) => {
            state.statusUpdateInfo = LOADING_STATUS
        })

        builder.addCase(fetchUpdateInfo.fulfilled, (state, action: PayloadAction<{ message: string, rows: any, error: any }>) => {
            state.infoUpdate = action.payload
            state.statusUpdateInfo = SUCCESS_STATUS
        })

        builder.addCase(fetchUpdateInfo.rejected, (state) => {
            state.statusUpdateInfo = FAILED_STATUS
        })
    },
})


// export const { } = usersUpdateSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersUpdateSlice.reducer