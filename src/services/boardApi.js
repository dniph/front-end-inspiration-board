
import axios from "axios";

const BASE_URL = "http://localhost:5000"; 
export const getBoards = () => {
    return axios.get(`${BASE_URL}/boards`);
};
