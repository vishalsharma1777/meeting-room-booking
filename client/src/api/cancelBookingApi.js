import axios from "axios";

async function cancelBooking(id) {
    const response = await axios.delete(`http://localhost:3000/booking/${id}`);
    return response;
}

export default cancelBooking;
