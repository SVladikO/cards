import {Wrapper, Title, SmallSuit, BigSuit} from "./Card,style";

function Card({card, isTrump, handleClick = () => {}}) {
    console.log(card);
    return (
        <Wrapper onClick={handleClick} background={card.background} isTrump={isTrump}>
            <Title colorSuit={card.color}>{card.title}</Title>
            <SmallSuit>{card.suit}</SmallSuit>
            <BigSuit colorSuit={card.color}>{card.suit}</BigSuit>
        </Wrapper>
    );
}

export default Card;
