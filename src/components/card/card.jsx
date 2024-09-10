import {Wrapper, Title, SmallSuit, BigSuit} from "./card.style";

function Card({card, isTrump, handleClick = () => {}}) {
    console.log(card);
    return (
        <Wrapper
            className='card'
            onClick={handleClick}
            background={card.background}
            colorSuit={card.color}
            isTrump={isTrump}
        >
            <Title>{card.title}</Title>
            <SmallSuit>{card.suit}</SmallSuit>
            <BigSuit colorSuit={card.color}>{card.suit}</BigSuit>
        </Wrapper>
    );
}

export default Card;
