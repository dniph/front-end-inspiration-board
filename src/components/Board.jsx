// src/components/Board.jsx
import "./Board.css";
import PropTypes from "prop-types";

const Board = ({ board, onBoardSelect, onDeleteBoard }) => {
    return (
    <div className="board" onClick={() => onBoardSelect(board)}> 
        <h3>{board.title}</h3>
        <p>by {board.owner}</p>
        <button onClick={() => onDeleteBoard(board.board_id)}>🗑️ Delete</button>
    </div>
    );
};

Board.propTypes = {
    board: PropTypes.shape({
    board_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    }).isRequired,
    onBoardSelect: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
};

export default Board;
