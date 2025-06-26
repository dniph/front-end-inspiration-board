import axios from "axios";

const BASE_URL = "https://inspo-board-api-cyws.onrender.com";

export const getCardsByBoardId = (boardId) => {
  return axios.get(`${BASE_URL}/boards/${boardId}/cards`);
};

export const createCard = (boardId, cardData) => {
  return axios.post(`${BASE_URL}/boards/${boardId}/cards`, cardData);
};

export const deleteCard = (cardId) => {
  return axios.delete(`${BASE_URL}/cards/${cardId}`);
};

export const likeCard = (cardId) => {
  return axios.patch(`${BASE_URL}/cards/${cardId}/like`);
};

export const dislikeCard = (cardId) => {
  return axios.patch(`${BASE_URL}/cards/${cardId}/dislike`);
};