// src/components/Board.jsx
import "./Board.css";
import PropTypes from "prop-types";

const Board = ({ board, onBoardSelect }) => {
    return (
    <div className="board" onClick={() => onBoardSelect(board)}>
        <h3>{board.title}</h3>
        <p>by {board.owner}</p>
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
};

export default Board;