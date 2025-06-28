const Card = ({ card, onDelete, onLike, onDislike }) => {
  return (
    <div className="card">
      <p>{card.message}</p>
      <div>
        <span>❤️ {card.likes_count}</span>
        <button onClick={() => onLike(card.card_id)}>Like</button>
        
        <span style={{ marginLeft: "10px" }}>👎 {card.dislike_count || 0}</span>

        <button onClick={() => onDislike(card.card_id)}>Dislike</button>

        <button onClick={() => onDelete(card.card_id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;