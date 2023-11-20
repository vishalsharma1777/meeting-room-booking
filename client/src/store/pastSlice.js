import { createSlice } from "@reduxjs/toolkit"; 

const intialStatePast = {
    pastBookingsArray: [],
    pastLoading: false,
    pastError: '',
}

const pastBoookingsSlice = createSlice({
    name: "pastBookings",
    initialState: intialStatePast,
    reducers: {
        fetchPastBookings: (state, action) => {
            state.pastBookingsArray = action.payload;
            state.pastLoading = false;
        },
        pastLoadingAction: (state, action) => {
            state.pastLoading = action.payload;
        },
        pastErrorAction: (state, action) => {
            state.pastError = action.payload;
            state.pastLoading = false;
        }
    }
})

export const pastBookingsActions = pastBoookingsSlice.actions;


export default pastBoookingsSlice.reducer;