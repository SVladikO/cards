
const getStyle = card => ({
    width: '30px',
    border: "solid 1px red",
    borderRadius: '3px',
    color: card.color,
    background: card.hide ? 'yellow': card.warning ? 'red' : 'white',
})

function Card({card, handleClick = () => {}}) {

    return (
        <div onClick={handleClick}
             style={getStyle(card)}>
            {card.title}{card.suit}
        </div>
    );
}

export default Card;
