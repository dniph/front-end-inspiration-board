// src/App.jsx
import { useEffect, useState } from "react";
import { createBoard, getBoards } from "./services/boardAPI";
import Board from "./components/Board";
import "./App.css";
import NewBoardForm from "./components/NewBoardForm";
import CardList from "./components/CardList";
import {getCardsByBoardId} from "./services/cardApi.js";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
  // Just for testing porposes
  const fakeBoards = [
    { board_id: 1, title: "The smallest and hottest moon", owner: "Lulu Games" },
    { board_id: 2, title: "The freeman", owner: "Varto Devs" },
  ];

  setBoardsData(fakeBoards);
}, []);

  // useEffect(() => {
  //   getBoards()
  //     .then((response) => {
  //       setBoardsData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching boards:", error);
  //     });
  // }, []);


useEffect(() => {
  if (selectedBoard) {
    // fake data
    const fakeCards = [
      { card_id: 1, message: "You are amazing!", likes_count: 5 },
      { card_id: 2, message: "Stay curious.", likes_count: 2 },
      { card_id: 3, message: "Believe in yourself.", likes_count: 7 }
    ];

    setCards(fakeCards); // get fake data into setCards
  }
}, [selectedBoard]);


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

  const createNewBoard = (newBoardData) => {
    createBoard(newBoardData)
      .then((response) => {
        setBoardsData([...boardsData, response.data]);
      })
      .catch((error) => {
        console.error("Error creating board:", error);
      });
  }

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
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
            <strong>{selectedBoard.title}</strong> by{" "}
            <em>{selectedBoard.owner}</em>
          </p>
        </div>
      )}
      {selectedBoard && (
        <CardList
          cards={cards}
          onDelete={(id) => console.log("delete", id)}
          onLike={(id) => console.log("like", id)}
        />
      )}
    </div>
  );
}

export default App;
