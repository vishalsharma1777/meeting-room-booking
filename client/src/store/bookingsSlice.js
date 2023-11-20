import { createSlice } from "@reduxjs/toolkit"; 

const intialState = {
    bookingsArray: [],
    loading: false,
    error: '',
    canceling: false,
    cancelingResult:false
}

const boookingsSlice = createSlice({
    name: "bookings",
    initialState: intialState,
    reducers: {
        fetchbookings: (state, action) => {
            state.bookingsArray = action.payload;
            state.loading = false;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
        error: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        

    }
})

export const bookingActions = boookingsSlice.actions;


export default boookingsSlice.reducer;