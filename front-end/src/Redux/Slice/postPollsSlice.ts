import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, pollsData, postPollsInfo, SUCCESS_STATUS } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: postPollsInfo = {
    statusPolls: IDLE_STATUS,
    infoPolls: {
        message: 'Próba wysłania ankiety',
        rows: 'test',
        error: 'oby nie error'
    },
};

export const fetchPostPolls = createAsyncThunk("postPolls/postPolls", async (pollsData: pollsData) => {

    const { name, question, number, option, id } = pollsData;

    try {
        const data = await fetch(`http://localhost:3022/users/postPolls`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                question,
                number,
                option,
                id,
            }),
            mode: "cors",
            cache: "default",
        });
        const result = data.json();
        return await result;
    } catch (error) {
        console.warn(error)
    }
}
);

export const postPollsSlice = createSlice({
    name: "postPolls",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostPolls.pending, (state) => {
            state.statusPolls = LOADING_STATUS
        })
        builder.addCase(fetchPostPolls.fulfilled, (state, action: PayloadAction<{ message: string, rows: any, error: any }>) => {
            state.infoPolls = action.payload
            state.statusPolls = SUCCESS_STATUS
        })
        builder.addCase(fetchPostPolls.rejected, (state) => {
            state.statusPolls = FAILED_STATUS
        })
    },
});

// export const {  } = postPollsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default postPollsSlice.reducer;
