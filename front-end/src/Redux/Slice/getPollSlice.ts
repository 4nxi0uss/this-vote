import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FAILED_STATUS, getPollsInfo, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: getPollsInfo = {
    statusGetPolls: IDLE_STATUS,
    infoGetPolls: {
        message: 'Próba wysłania ankiety',
        data: [{
            id: 0,
            userId: "userId",
            name: "ANton",
            question: "question",
            number: 0,
            options: `{}`
        }]
    },
};

export const fetchGetPolls = createAsyncThunk("getPolls/getPolls", async (id: string) => {

    try {
        const data = await fetch(`http://localhost:3022/users/getPolls/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
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

export const getPollSlice = createSlice({
    name: "getPolls",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetPolls.pending, (state) => {
            state.statusGetPolls = LOADING_STATUS
        })
        builder.addCase(fetchGetPolls.fulfilled, (state, action: PayloadAction<{ message: string, data: any }>) => {
            state.infoGetPolls = action.payload
            state.statusGetPolls = SUCCESS_STATUS
        })
        builder.addCase(fetchGetPolls.rejected, (state) => {
            state.statusGetPolls = FAILED_STATUS
        })
    },
});

// export const {  } = getPollSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default getPollSlice.reducer;
