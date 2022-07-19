import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletingDataType, deletingInfo, FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from "../ReduxTypes/reduxTypes";


// Define the initial state using that type
const initialState: deletingInfo = {
    deletingStatus: IDLE_STATUS,
    deletingInfo: {
        message: "register",
        error: "oby nie error"
    }
};

export const deletePoll = createAsyncThunk("deleting/pollDeleting", async (delData: deletingDataType) => {
    const { userId, id } = delData
    try {
        const data = await fetch('http://localhost:3022/users/deletePoll', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                id: id,
            })
        })
        const result = data.json();
        return await result;

    } catch (error) {
        throw await error
    }

})

export const deletingPollSlice = createSlice({
    name: 'deleting',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deletePoll.pending, (state) => {
            state.deletingStatus = LOADING_STATUS
        })
        builder.addCase(deletePoll.fulfilled, (state, action: PayloadAction<{ message: string, error: string }>) => {
            state.deletingInfo = action.payload
            state.deletingStatus = SUCCESS_STATUS
        })
        builder.addCase(deletePoll.rejected, (state) => {
            state.deletingStatus = FAILED_STATUS
        })
    },
})


// export const { clearStatus, clearInfo } = deletingPollSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default deletingPollSlice.reducer