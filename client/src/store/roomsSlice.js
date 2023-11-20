import { createSlice } from "@reduxjs/toolkit"; 

const intialStateRoom = {
    roomsArray: [],
    currentAvailableRooms:[],
    availabiltyLoading: false,
    availabiltyError: '',
    loading: true,
    error: '',
    addBookingErrorMessage: '',
    addBookingErrorFailed: false,
    addBookingLoading: true,
    addBookingTried:false
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState: intialStateRoom,
    reducers: {
        fetchRooms: (state, action) => {
            state.roomsArray = action.payload;
            state.loading = false;
        },
        loading: (state, action) => {
            setTimeout(() => {
                state.loading = action.payload;
            }, 4000);
        },
        error: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        fetchAvailableRooms: (state, action) => {
            state.currentAvailableRooms = action.payload;
            state.availabiltyLoading = false;
        },
        availabiltyLoading: (state, action) => {
            state.availabiltyLoading = action.payload;
        },
        availabiltyError: (state, action) => {
            state.availabiltyError = action.payload;
            state.availabiltyLoading = false;
        },
        addBookingAction: (state, action) => {
            const roomId = action.payload.bookingRoomID;
            const roomIndex = state.currentAvailableRooms.findIndex(room => room._id === roomId);
            state.currentAvailableRooms.splice(roomIndex, 1);
            state.addBookingErrorMessage = '';
            state.addBookingErrorFailed = false;
            state.addBookingLoading = false;
        },
        addBookingLoadingAction: (state, action) => {
            state.addBookingLoading = action.payload;
        },
        addBookingTriedAction:(state,action)=>{
            state.addBookingTried = action.payload
        },
        addBookingErrorAction: (state, action) => {
            state.addBookingErrorFailed = true;
            state.addBookingErrorMessage = action.payload;
            state.addBookingLoading = false;
        },
    }
})

export const roomsAction = roomsSlice.actions;


export default roomsSlice.reducer;