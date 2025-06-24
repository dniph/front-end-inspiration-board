// src/components/Board.jsx
import "./Board.css";

const Board = ({ board, onBoardSelect }) => {
    return (
    <div className="board" onClick={() => onBoardSelect(board)}>
        <h3>{board.title}</h3>
        <p>by {board.owner}</p>
    </div>
    );
};

export default Board;