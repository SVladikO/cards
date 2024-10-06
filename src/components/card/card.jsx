import {useRef, useEffect} from 'react';

import {Wrapper, Title, SmallSuit, BigSuit} from "./card.style";

import {decodeEmoji} from '../../utils/cards-data';
const emptyFunc = () => {}
function Card({card, isTrump, handleClick = emptyFunc}) {
    const emoji = decodeEmoji(card.emojiCode);

    const cardRef = useRef(null);
    const smallSuitRef = useRef(null);
    const bigSuitRef = useRef(null);

    useEffect(() => {
        smallSuitRef.textContent = emoji;
        bigSuitRef.textContent = emoji;
    }, [card])

    useEffect(() => {
        const {offsetTop, offsetLeft} = cardRef.current;
        console.log(888888, {offsetTop, offsetLeft})
        // handleClick()

    }, [card])

    return (
        <Wrapper
            className={`card ${card.title}-${card.suit}`}
            onClick={handleClick}
            background={card.background}
            colorSuit={card.color}
            isTrump={isTrump}
            ref={cardRef}
        >
            <Title>{card.title}</Title>
            <SmallSuit ref={smallSuitRef}>{emoji}</SmallSuit>
            <BigSuit ref={bigSuitRef} colorSuit={card.color}>{emoji}</BigSuit>
        </Wrapper>
    );
}

export default Card;
