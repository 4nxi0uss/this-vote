import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: any = {
    initialPage: 1
}

export const PaginationSlice = createSlice({
    name: 'pagination',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.initialPage += 1
        },
        decrementPage: (state) => {
            state.initialPage -= 1
        },
        incrementByAmountPage: (state, action: PayloadAction<number>) => {
            state.initialPage = action.payload
        },
    },
})

export const { incrementByAmountPage, incrementPage, decrementPage } = PaginationSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default PaginationSlice.reducer