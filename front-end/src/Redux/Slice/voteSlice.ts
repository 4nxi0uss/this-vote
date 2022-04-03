import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FAILED, LOADING, putOptionType, putPoolsInfo, SUCCESS } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: putPoolsInfo = {
    statusPutPoll: FAILED,
    infoPutPoll: {
        message: 'Próba wysłania ankiety',
    },
};

export const fetchPutPolls = createAsyncThunk("putPoll/putPoll", async (putOptions: putOptionType) => {

    const { id, options } = putOptions;

    try {
        const data = await fetch(`http://localhost:3022/users/putPool`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                option: options
            }),
            mode: "cors",
            cache: "default",
        });
        const result = data.json();
        return await result;
    } catch (error) {
        console.warn(error)
    }
});

export const usersPutPoll = createSlice({
    name: "putPoll",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPutPolls.pending, (state) => {
            state.statusPutPoll = LOADING
        })
        builder.addCase(fetchPutPolls.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
            state.infoPutPoll = action.payload
            state.statusPutPoll = SUCCESS
        })
        builder.addCase(fetchPutPolls.rejected, (state) => {
            state.statusPutPoll = FAILED
        })
    },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersPutPoll.reducer;
