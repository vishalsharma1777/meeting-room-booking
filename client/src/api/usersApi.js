import axios from "axios";

export async function fetchUserNames() {
    const response = await axios.get("http://localhost:3000/users/usernames");
    return response;
}

export async function fetchUserUpcomingBookings(id) {
    const response = await axios.get(`http://localhost:3000/users/${id}/upcomingBookings`);
    return response;
}

export async function fetchUserPastBookings(id) {
    const response = await axios.get(`http://localhost:3000/users/${id}/pastBookings`);
    return response;
}

export async function createUser(formData){
    const response = await axios.post("http://localhost:3000/users/createUser", formData);
    return response;
}

export async function loginUser(loginData){
    const response = await axios.post("http://localhost:3000/users/login", loginData);
    return response;
}
