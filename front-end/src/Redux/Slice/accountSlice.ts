import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userDataType, FAILED, SUCCESS, LOADING, userLoginStatus } from '../ReduxTypes/reduxTypes';
import type { RootState } from '../Store/store'

// Define the initial state using that type
const initialState: userLoginStatus = {
    status: FAILED,
    info: ''
}

export const fetchUsersLogin = createAsyncThunk("users/getLogin", async (userData: userDataType) => {

    const { email, password } = userData;

    try {
        const data = await fetch('http://localhost:3022/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`
            })
        })
        const result = data.json()
        return result
    } catch (error) {
        throw error
    }
})

export const usersLoginSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersLogin.pending, (state) => {
            state.status = LOADING
        })
        builder.addCase(fetchUsersLogin.fulfilled, (state, { payload }: PayloadAction<string>) => {
            state.info = payload
            state.status = SUCCESS
        })
        builder.addCase(fetchUsersLogin.rejected, (state) => {
            state.status = FAILED
        })
    },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectStatus = (state: RootState) => state.users.status

export default usersLoginSlice.reducer