
import axios from "axios";

const BASE_URL = "https://inspo-board-api-cyws.onrender.com";

export const getBoards = () => {
    return axios.get(`${BASE_URL}/boards`);
};

export const createBoard = (boardData) => {
    return axios.post(`${BASE_URL}/boards`, boardData);
};
