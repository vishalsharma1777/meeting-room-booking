import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const currentDate = dayjs();
  const nearest15Minute = currentDate.minute(
    currentDate.minute() + 15 - (currentDate.minute() % 15)
  );

const initialStateTime = {
    selectedTime: nearest15Minute,
    hours: 0,
    minutes: 30,
    interval: {
        startingTime: nearest15Minute.toISOString(),
        endingTime: nearest15Minute.add(30, "minute"),
    },
    range:true
}

const timeSlice = createSlice({
    name: "time",
    initialState: initialStateTime,
    reducers: {
        setTime: (state, action) => {
            state.selectedTime = action.payload;
        },
        setHours: (state, action) => {
            state.hours = action.payload;
        },
        setMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        setRange:(state,action)=>{
            state.range=action.payload;
        },
        setInterval: (state,action) => {
            state.interval.startingTime = action.payload.startingTime;
            state.interval.endingTime = new Date(action.payload.endingTime);
        },
        resetInterval: (state) => {
            state.interval.startingTime = state.selectedTime.toISOString();
            state.interval.endingTime = state.selectedTime.add(30, "minute");
        }

    }
})

export const timeActions = timeSlice.actions;
export default timeSlice.reducer;