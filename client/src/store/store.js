import { configureStore } from "@reduxjs/toolkit";

import userNameReducer from "./userNameSlice";
import timeReducer from "./timeSlice";
import bookingsReducer from "./bookingsSlice";
import roomsReducer from "./roomsSlice";
import upcomingBookingsReducer from "./upcomingSlice";
import pastBookingReducer from "./pastSlice";
import tableReducer from "./tableSlice";
import authorizationSlice from "./authorizationSlice";

const store = configureStore({
  reducer: {
    userName: userNameReducer,
    duration: timeReducer,
    bookings: bookingsReducer,
    upcomingBookings: upcomingBookingsReducer,
    pastBookings:pastBookingReducer,
    rooms: roomsReducer,
    table: tableReducer,
    authorization: authorizationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;