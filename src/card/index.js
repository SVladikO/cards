
function Card({suit, rang}) {
    return (
        <div style={{color: suit.color}}>
            {rang}{suit.value}
        </div>
    );
}

export default Card;
