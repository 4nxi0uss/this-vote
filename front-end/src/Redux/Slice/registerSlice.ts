import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, registerDataType, registerInfo, SUCCESS_STATUS } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: registerInfo = {
    registerStatus: IDLE_STATUS,
    registerInfo: {
        message: "register",
        row: "",
        error: "oby nie error"
    }
};

export const fetchPostRegister = createAsyncThunk("register/postRegister", async (registerData: registerDataType) => {
    const { email, password } = registerData
    try {
        const data = await fetch('http://localhost:3022/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usersEmail: `${email}`,
                pass: `${password}`,
            })
        })
        const result = data.json();
        return await result;

    } catch (error) {
        throw await error
    }
})

export const registerSlice = createSlice({
    name: 'register',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostRegister.pending, (state) => {
            state.registerStatus = LOADING_STATUS
        })
        builder.addCase(fetchPostRegister.fulfilled, (state, action: PayloadAction<{ message: string, row: string, error: string }>) => {
            state.registerInfo = action.payload
            state.registerStatus = SUCCESS_STATUS
        })
        builder.addCase(fetchPostRegister.rejected, (state) => {
            state.registerStatus = FAILED_STATUS
        })
    },
})

// export const { clearStatus, clearInfo } = registerSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default registerSlice.reducer