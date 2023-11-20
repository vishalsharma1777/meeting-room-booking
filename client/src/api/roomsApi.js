import axios from "axios";

export async function fetchRooms() {
    const response = await axios.get("http://localhost:3000/rooms/allRooms");
    return response;
}

export async function fetchAllCurrentAvailableRooms() {
    const response = await axios.get("http://localhost:3000/rooms/allCurrentAvailableRooms");
    return response;
}

export async function fetchAllAvailableRooms(startingTime, endingTime) {
    const response = await axios.get('http://localhost:3000/rooms/availableRooms/',
        {
            headers: {
                startingTime: startingTime,
                endingTime: endingTime
            }
        });

    return response;
}

export async function fetchSearchDateRooms(searchDate) {
    const response = await axios.get('http://localhost:3000/rooms/bookingsOfParticularDate/',
        {
            headers: {
                searchDate: searchDate
            }
        });

    return response;
}

