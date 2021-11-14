import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userDataType, FAILED, SUCCESS, LOADING, userLoginStatus, userLoginInfo, infoUpdate } from '../ReduxTypes/reduxTypes';
import type { RootState } from '../Store/store'

// Define the initial state using that type
const initialState: userLoginStatus & userLoginInfo = {
    statusLogin: FAILED,
    statusUpdateInfo: FAILED,
    info: {
        message: 'Zaloguj się',
        login: false,
        rows: ''
    },
    infoUpdate: {
        message: 'tak',
        rows: ''
    },
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
        const result = data.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const usersLoginSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.statusLogin = FAILED
        },
        clearInfo: (state: userLoginInfo) => {
            state.info.login = false
            state.info.message = 'Logout'
            state.info.rows = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersLogin.pending, (state) => {
            state.statusLogin = LOADING
        })
        builder.addCase(fetchUpdateInfo.pending, (state) => {
            state.statusUpdateInfo = LOADING
        })
        builder.addCase(fetchUsersLogin.fulfilled, (state, action: PayloadAction<{ message: string, login: boolean, rows: any }>) => {
            state.info = action.payload
            state.statusLogin = SUCCESS
        })
        builder.addCase(fetchUpdateInfo.fulfilled, (state, action: PayloadAction<{ message: string, login: boolean, rows: any }>) => {
            state.infoUpdate = action.payload
            state.statusUpdateInfo = SUCCESS
        })
        builder.addCase(fetchUsersLogin.rejected, (state) => {
            state.statusLogin = FAILED
        })
        builder.addCase(fetchUpdateInfo.rejected, (state) => {
            state.statusUpdateInfo = FAILED
        })
    },
})


export const { clearStatus, clearInfo } = usersLoginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersLoginSlice.reducer