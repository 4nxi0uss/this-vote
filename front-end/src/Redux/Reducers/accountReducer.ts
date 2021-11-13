import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userDataType } from '../ReduxTypes/ReduxTypes';
import type { RootState } from '../Store/store'

// Define a type for the slice state
interface CounterState {
    value: number
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
}

export const fetchUsersLogin = createAsyncThunk("users/getLogin", async (userData:userDataType) => {

    const {email, password} = userData;

    try{
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
} catch (error){
 throw error
}
    // .then(res => res.json()).then(data => console.log(data))
})

export const counterSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer