import { createSlice } from "@reduxjs/toolkit"; 

const intialState = {
    userNameArray: [],
    loading: false,
    error: ''
}

const userNameSlice = createSlice({
    name: "userName",
    initialState: intialState,
    reducers: {
        fetchUserName: (state, action) => {
            state.userNameArray = action.payload;
            state.loading = false;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
        error: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const userNameActions = userNameSlice.actions;


export default userNameSlice.reducer;