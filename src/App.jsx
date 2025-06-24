// src/App.jsx
import { useEffect, useState } from "react";
import { getBoards } from "./services/boardAPI";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);


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

  return (
    <div className="App">
      <h1>Inspiration Board</h1>

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
    </div>
  );
}

export default App;
