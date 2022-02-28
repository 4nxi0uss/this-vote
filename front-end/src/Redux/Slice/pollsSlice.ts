import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FAILED, LOADING, pollsData, pollsInfo, SUCCESS } from "../ReduxTypes/reduxTypes";

// Define the initial state using that type
const initialState: pollsInfo = {
    statusPolls: FAILED,
    infoPolls: {
        message: 'Próba wysłania ankiety',
        rows: 'test',
        error: 'oby nie error'
    },
};

export const fetchPostPolls = createAsyncThunk("polls/postPolls", async (pollsData: pollsData) => {

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
                // option: {
                //     name: option.name,
                //     color: option.color
                // },
                id,
            }),
            mode: "cors",
            cache: "default",
        });
        const result = data.json();
        return await result;
    } catch (error) { }
}
);

export const usersPolls = createSlice({
    name: "polls",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostPolls.pending, (state) => {
            state.statusPolls = LOADING
        })
        builder.addCase(fetchPostPolls.fulfilled, (state, action: PayloadAction<{ message: string, rows: any, error: any }>) => {
            state.infoPolls = action.payload
            state.statusPolls = SUCCESS
        })
        builder.addCase(fetchPostPolls.rejected, (state) => {
            state.statusPolls = FAILED
        })
    },
});

// export const {  } = usersPolls.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectStatus = (state: RootState) => state.users.statusLogin

export default usersPolls.reducer;
