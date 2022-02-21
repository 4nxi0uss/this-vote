import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { infoLoginType, FAILED, SUCCESS, LOADING, userLoginStatus, userLoginInfo, infoUpdate } from '../ReduxTypes/reduxTypes';

// Define the initial state using that type
const initialState: userLoginStatus & userLoginInfo = {
    statusLogin: FAILED,
    statusUpdateInfo: FAILED,
    statusUserData: FAILED,
    infoLogin: {
        message: 'Zaloguj się',
        login: false,
        rows: ''
    },
    infoUpdate: {
        message: 'tak',
        rows: '',
        error: ''
    },
    userData: {
        message: 'próba zaciągnięcia danych z bazy',
        data: [
            {
                Name: '',
                Surname: '',
                active: Number(),
                date_of_birth: '',
                id: Number(),
                polls: '',
                type_of_account: Number(),
                user_id: '',
            }],
        error: ''
    },
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
export const fetchGetUserData = createAsyncThunk("users/getUserData", async (userId: infoUpdate) => {

    try {
        const data = await fetch(`http://localhost:3022/users/getUserData/${userId}`, {
            method: 'GET',
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

export const usersLoginSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.statusLogin = FAILED
        },
        clearInfo: (state: userLoginInfo) => {
            state.infoLogin.login = false
            state.infoLogin.message = 'Logout'
            state.infoLogin.rows = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersLogin.pending, (state) => {
            state.statusLogin = LOADING
        })
        builder.addCase(fetchUpdateInfo.pending, (state) => {
            state.statusUpdateInfo = LOADING
        })
        builder.addCase(fetchGetUserData.pending, (state) => {
            state.statusUserData = LOADING
        })
        builder.addCase(fetchUsersLogin.fulfilled, (state, action: PayloadAction<{ message: string, login: boolean, rows: any }>) => {
            state.infoLogin = action.payload
            state.statusLogin = SUCCESS
        })
        builder.addCase(fetchUpdateInfo.fulfilled, (state, action: PayloadAction<{ message: string, rows: any, error: any }>) => {
            state.infoUpdate = action.payload
            state.statusUpdateInfo = SUCCESS
        })
        builder.addCase(fetchGetUserData.fulfilled, (state, action: PayloadAction<{ message: string, data: any, error: any }>) => {
            state.userData = action.payload
            state.statusUserData = SUCCESS
        })
        builder.addCase(fetchUsersLogin.rejected, (state) => {
            state.statusLogin = FAILED
        })
        builder.addCase(fetchUpdateInfo.rejected, (state) => {
            state.statusUpdateInfo = FAILED
        })
        builder.addCase(fetchGetUserData.rejected, (state) => {
            state.statusUserData = FAILED
        })
    },
})


export const { clearStatus, clearInfo } = usersLoginSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersLoginSlice.reducer