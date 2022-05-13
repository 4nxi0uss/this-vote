import { createSlice } from "@reduxjs/toolkit";
import { editSlice } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: editSlice = {
    isOpenEdit: false
};

export const editPollSlice = createSlice({
    name: 'editing',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        editToogle: (state) => {
            state.isOpenEdit = !state.isOpenEdit
        },
    }
})

export const { editToogle } = editPollSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default editPollSlice.reducer