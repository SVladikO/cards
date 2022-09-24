
const getStyle = card => ({
    width: '30px',
    border: "solid 1px red",
    borderRadius: '3px',
    color: card.color,
    background: 'white',
})

function Card({card, handleClick = () => {}}) {

    if (card.hide) {
        return;
    }

    return (
        <div onClick={handleClick}
             style={getStyle(card)}>
            {card.title}{card.suit}
        </div>
    );
}

export default Card;
