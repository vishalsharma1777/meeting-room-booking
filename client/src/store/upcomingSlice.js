import { createSlice } from "@reduxjs/toolkit"; 

const intialStateUpcoming = {
    upcomingBookingsArray: [],
    upcomingLoading: false,
    upcomingError: '',
    cancelingErrorMessage: '',
    cancelingErrorFailed: false,
    cancelationTried: false,
}

const upcomingBoookingsSlice = createSlice({
    name: "upcomingBookings",
    initialState: intialStateUpcoming,
    reducers: {
        fetchUpcomingBookings: (state, action) => {
            state.upcomingBookingsArray = action.payload;
            state.upcomingLoading = false;
        },
        upcomingLoadingAction: (state, action) => {
            state.upcomingLoading = action.payload;
        },
        upcomingErrorAction: (state, action) => {
            state.upcomingError = action.payload;
            state.upcomingLoading = false;
        },
        cancelBooking: (state, action) => {
            const bookingId = action.payload;
            const bookingIndex = state.upcomingBookingsArray.findIndex(booking => booking._id === bookingId);
            state.upcomingBookingsArray.splice(bookingIndex, 1);
            state.cancelingErrorFailed = false;
        },
        cancelingErrorAction: (state, action) => {
            state.cancelingErrorMessage = action.payload;
            state.cancelingErrorFailed = true;
        },
        cancelationTriedAction: (state, action) => {
            state.cancelationTried = action.payload;
        },
        cancelingErrorFailedAction: (state, action) => {
            state.cancelingErrorFailed = action.payload;
        }
    }
})

export const upcomingBookingsActions = upcomingBoookingsSlice.actions;


export default upcomingBoookingsSlice.reducer;