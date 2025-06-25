import { useState } from "react";
import PropTypes from "prop-types";
import "./NewCardForm.css";

const NewCardForm = ({ createNewCard }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    createNewCard({ message });
    setMessage("");
  };

    return (
    <form className="new-card-form" onSubmit={handleSubmit}>
      <label>
        Message:
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Card</button>
    </form>
  );
};

export default NewCardForm;