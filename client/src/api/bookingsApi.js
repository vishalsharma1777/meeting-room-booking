import axios from "axios";

export async function fetchBookings() {
    const response = axios.get("http://localhost:3000/bookings/allBookings");
    return response
}

export async function deleteBookingByID(id,userId) {
    const response = axios.delete(`http://localhost:3000/bookings/${userId}/${id}/delete`);
    return response
}

export async function addBooking(bookingData) {
    const response = axios.post("http://localhost:3000/bookings/addBooking", bookingData);
    return response
}




