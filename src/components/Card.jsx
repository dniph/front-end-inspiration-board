const Card = ({ card, onDelete, onLike }) => {
  return (
    <div className="card">
      <p>{card.message}</p>
      <div>
        <span>❤️ {card.likes_count}</span>
        <button onClick={() => onLike(card.card_id)}>Like</button>
        <button onClick={() => onDelete(card.card_id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
