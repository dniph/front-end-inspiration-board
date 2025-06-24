import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getCardsByBoardId = (boardId) => {
  return axios.get(`${BASE_URL}/boards/${boardId}/cards`);
};
