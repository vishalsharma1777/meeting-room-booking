import { createSlice } from "@reduxjs/toolkit";

const intialStateRoom = {
    searchDateData: [],
    searchDateDataLoading: true,
    searchDateDataError: '',
}

const tableSlice = createSlice({
    name: "searchDateData",
    initialState: intialStateRoom,
    reducers: {
        searchDateDataAction: (state, action) => {
            state.searchDateData = action.payload;
            state.searchDateDataLoading = false;
        },
        searchDateDataLoadingAction: (state, action) => {
            state.searchDateDataLoading = action.payload;
        },
        searchDateDataErrorAction: (state, action) => {
            state.error = action.payload;
            state.searchDateDataLoading = false;
        }
        
    }
})

export const tableAction = tableSlice.actions;


export default tableSlice.reducer;