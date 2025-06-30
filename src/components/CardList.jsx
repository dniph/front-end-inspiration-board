import Card from "./Card";
import "./Card.css";

const CardList = ({ cards, onDelete, onLike, onDislike}) => {
    return (
        <>
          {cards.map((card)=> (
            <Card 
              key = {card.card_id}
              card = {card}
              onDelete = {onDelete}
              onLike = {onLike}
              onDislike={onDislike}
            />
          ))}
        </>
    );
};

export default CardList;