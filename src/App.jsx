// src/App.jsx
import { useEffect, useState } from "react";
import { createBoard, getBoards } from "./services/boardAPI";
import Board from "./components/Board";
import "./App.css";
import NewBoardForm from "./components/NewBoardForm";
import CardList from "./components/CardList";
import { createCard, getCardsByBoardId } from "./services/cardApi.js";
import NewCardForm from "./components/NewCardForm";
import { deleteCard } from "./services/cardApi";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    getBoards()
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, []);


  // useEffect(() => {
  //   if (selectedBoard) {
  //     getCardsByBoardId(selectedBoard.board_id)
  //       .then((response) => {
  //         setCards(response.data.cards);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch cards:", error);
  //       });
  //   }
  // }, [selectedBoard]);

  useEffect(() => {
    if (!selectedBoard) return;

    getCardsByBoardId(selectedBoard.board_id)
      .then((response) => {
        const mappedCards = response.data.map((card) => ({
          card_id: card.id,
          message: card.card_message,
          likes_count: card.likes,
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



  
  // const createNewCard = (newCardData) => {
  //   if (!selectedBoard) return;

  //   createCard(selectedBoard.board_id, newCardData)
  //     .then((response) => {

  //       setCards([...cards, response.data]);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to create card:", error);
  //     });
  // };

  const createNewCard = (newCardData) => {
    if (!selectedBoard) return;

    createCard(selectedBoard.board_id, newCardData)
      .then((response) => {
        const cardFromServer = response.data;
        const mappedCard = {
          card_id: cardFromServer.id,
          message: cardFromServer.card_message,
          likes_count: cardFromServer.likes,
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
      // Filtra la tarjeta eliminada del estado
      const updatedCards = cards.filter((card) => card.card_id !== cardId);
      setCards(updatedCards);
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
};
  
  return (
    <div className="App">
      <h1>The Debugging Trashcats Board</h1>
      <NewBoardForm createNewBoard={createNewBoard} />

      <h2>Boards</h2>
      {boardsData.map((board) => (
        <Board
          key={board.board_id}
          board={board}
          onBoardSelect={setSelectedBoard}
        />
      ))}

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
          <CardList
            cards={cards}
            onDelete={handleDeleteCard}
            onLike={(id) => console.log("like", id)}
          />
        </>
      )}
    </div>
  );
}

export default App;


