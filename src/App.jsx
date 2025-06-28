import { useEffect, useState } from "react";
import { createBoard, getBoards, deleteBoard } from "./services/boardAPI";
import Board from "./components/Board";
import "./App.css";
import NewBoardForm from "./components/NewBoardForm";
import CardList from "./components/CardList";
import { createCard, getCardsByBoardId, deleteCard, likeCard, dislikeCard } from "./services/cardApi";
import NewCardForm from "./components/NewCardForm";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false); 
  useEffect(() => {
    getBoards()
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedBoard) return;
    getCardsByBoardId(selectedBoard.board_id)
      .then((response) => {
        const mappedCards = response.data.map((card) => ({
          card_id: card.id,
          message: card.card_message,
          likes_count: card.likes,
          dislike_count: card.dislikes,
          board_id: card.board_id,
        }));
        setCards(mappedCards);
      })
      .catch((error) => {
        console.error("Failed to fetch cards:", error);
      });
  }, [selectedBoard]);

  const createNewBoard = (newBoardData) => {
    createBoard(newBoardData)
      .then((response) => {
        setBoardsData([...boardsData, response.data]);
      })
      .catch((error) => {
        console.error("Error creating board:", error);
      });
  }

  const createNewCard = (newCardData) => {
    if (!selectedBoard) return;

    createCard(selectedBoard.board_id, newCardData)
      .then((response) => {
        const cardFromServer = response.data;
        const mappedCard = {
          card_id: cardFromServer.id,
          message: cardFromServer.card_message,
          likes_count: cardFromServer.likes,
          dislike_count: cardFromServer.dislikes,
          board_id: cardFromServer.board_id,
        };

        setCards([...cards, mappedCard]);
      })
      .catch((error) => {
        console.error("Failed to create card:", error);
      });
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId)
      .then(() => {
        const updatedCards = cards.filter((card) => card.card_id !== cardId);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  const handleLikeCard = (cardId) => {
    likeCard(cardId)
      .then((response) => {
        const updatedCards = cards.map((card) =>
          card.card_id === cardId
            ? { ...card, likes_count: response.data.likes }
            : card
        );
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  };

  const handleDeleteBoard = (boardId) => {
    deleteBoard(boardId)
      .then(() => {
        const updatedBoards = boardsData.filter((b) => b.board_id !== boardId);
        setBoardsData(updatedBoards);

        if (selectedBoard?.board_id === boardId) {
          setSelectedBoard(null);
          setCards([]);
        }
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  const getDisplayedCards = () => {
    if (sortByLikes) {
      return [...cards].sort((a, b) => b.likes_count - a.likes_count);
    }
    return cards;
  };


  const handleDislikeCard = (cardId) => {
    dislikeCard(cardId)
      .then((response) => {
        const updatedCards = cards.map((card) =>
          card.card_id === cardId
            ? {
                ...card,
                dislike_count: response.data.dislikes,
              }
            : card
        );
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error adding dislike:", error);
      });
  };
  return (
    <div className="App">
      <h1>The Debugging Trashcats Board</h1>
      <h2>Boards</h2>
      {boardsData.map((board) => (
        <Board
          key={board.board_id}
          board={board}
          onBoardSelect={setSelectedBoard}
          onDeleteBoard={handleDeleteBoard}
        />
      ))}
      <NewBoardForm createNewBoard={createNewBoard} />
      {selectedBoard && (
        <div className="selected-board">
          <h2>Selected Board</h2>
          <p>
            <strong>{selectedBoard.title}</strong> by <em>{selectedBoard.owner}</em>
          </p>
        </div>
      )}

      {selectedBoard && (
        <>
          <NewCardForm createNewCard={createNewCard} />
          <button className="sort-button" onClick={() => setSortByLikes(!sortByLikes)}>
            {sortByLikes ? "Unsort" : "Sort by Likes"}
          </button>
          <CardList
            cards={getDisplayedCards()}
            onDelete={handleDeleteCard}
            onLike={handleLikeCard}
            onDislike={handleDislikeCard}
          />
        </>
      )}
    </div>
  );
}

export default App;
