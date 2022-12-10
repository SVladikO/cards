import {Wrapper, Title, Suit} from "./Card,style";

function Card({card, handleClick = () => {}}) {
    console.log(card);
    return (
        <Wrapper onClick={handleClick} background={card.background}>
            <Title colorSuit={card.color}>{card.title}{card.suit}</Title>
            <Suit colorSuit={card.color}>{card.suit}</Suit>
        </Wrapper>
    );
}

export default Card;
