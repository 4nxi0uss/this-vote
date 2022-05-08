import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletingDataType, deletingInfo, FAILED, LOADING, SUCCESS } from "../ReduxTypes/reduxTypes";


// Define the initial state using that type
const initialState: deletingInfo = {
    deletingStatus: FAILED,
    deletingInfo: {
        message: "register",
        error: "oby nie error"
    }
};

export const deletePoll = createAsyncThunk("deleting/pollDeleting", async (delData: deletingDataType) => {
    const { creatorId, id } = delData
    try {
        const data = await fetch('http://localhost:3022/users/deletePoll', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creatorId: creatorId,
                id: id,
            })
        })
        const result = data.json();
        return await result;

    } catch (error) {
        throw await error
    }

})

export const registerSlice = createSlice({
    name: 'deleting',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deletePoll.pending, (state) => {
            state.deletingStatus = LOADING
        })
        builder.addCase(deletePoll.fulfilled, (state, action: PayloadAction<{ message: string, error: string }>) => {
            state.deletingInfo = action.payload
            state.deletingStatus = SUCCESS
        })
        builder.addCase(deletePoll.rejected, (state) => {
            state.deletingStatus = FAILED
        })
    },
})


// export const { clearStatus, clearInfo } = registerSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default registerSlice.reducer