import { useState } from "react";
import "./NewBoardForm.css";
import PropTypes from "prop-types";

const NewBoardForm = ({ createNewBoard }) => {
    const [title, setTitle] = useState("");
    const [owner, setOwner] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim || !owner.trim) {
            setError("Both title and owner are required.");
            return;
        }
        createNewBoard({ title, owner });
        setTitle("");
        setOwner("");
        setError("");
    };
    
    return (
        <div className="new-board-form-container">
            <button onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? "Hide New Board Form" : "+ New Board Form"}
            </button>
            {formVisible && (
                <form onSubmit={handleSubmit} className="new-board-form">
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Owner:
                        <input
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Create Board</button>
                </form>
            )}
            </div>
        );

};

NewBoardForm.propTypes = {
    createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;