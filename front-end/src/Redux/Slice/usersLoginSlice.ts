import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { infoLoginType, FAILED_STATUS, SUCCESS_STATUS, LOADING_STATUS, userLoginInfo, IDLE_STATUS } from '../ReduxTypes/reduxTypes';

// Define the initial state using that type
const initialState: any = {
    statusLogin: IDLE_STATUS,
    infoLogin: {
        message: 'Zaloguj się',
        login: false,
        rows: ''
    }
}

export const fetchUsersLogin = createAsyncThunk("users/getLogin", async (loginData: infoLoginType) => {

    const { email, password } = loginData;

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
        return await result
    } catch (error) {
        throw await error
    }
})

export const usersLoginSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.statusLogin = IDLE_STATUS
        },
        clearInfo: (state: userLoginInfo) => {
            state.infoLogin.login = false
            state.infoLogin.message = 'Logout'
            state.infoLogin.rows = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersLogin.pending, (state) => {
            state.statusLogin = LOADING_STATUS
        })
        builder.addCase(fetchUsersLogin.fulfilled, (state, action: PayloadAction<{ message: string, login: boolean, rows: any }>) => {
            state.infoLogin = action.payload
            state.statusLogin = SUCCESS_STATUS
        })
        builder.addCase(fetchUsersLogin.rejected, (state) => {
            state.statusLogin = FAILED_STATUS
        })
    },
})

export const { clearStatus, clearInfo } = usersLoginSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersLoginSlice.reducer