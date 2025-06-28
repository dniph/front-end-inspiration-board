import Card from "./Card";

const CardList = ({ cards, onDelete, onLike, onDislike}) => {
    return (
        <div className="card-list">
          {cards.map((card)=> (
            <Card 
              key = {card.card_id}
              card = {card}
              onDelete = {onDelete}
              onLike = {onLike}
              onDislike={onDislike}
            />
          ))}
        </div>
    );
};

export default CardList;