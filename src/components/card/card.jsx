import {useRef, useEffect} from 'react';

import {Wrapper, Title, SmallSuit, BigSuit} from "./card.style";

import {decodeEmoji} from '../../utils/cards-data';

function Card({card, isTrump, handleClick = () => {}}) {
    const emoji = decodeEmoji(card.emojiCode);

    const smallSuit = useRef(null);
    const bigSuit = useRef(null);

    useEffect(() => {
        smallSuit.textContent = emoji;
        bigSuit.textContent = emoji;

    }, [card])

    return (
        <Wrapper
            className='card'
            onClick={handleClick}
            background={card.background}
            colorSuit={card.color}
            isTrump={isTrump}
        >
            <Title>{card.title}</Title>
            <SmallSuit ref={smallSuit}>{emoji}</SmallSuit>
            <BigSuit ref={bigSuit} colorSuit={card.color}>{emoji}</BigSuit>
        </Wrapper>
    );
}

export default Card;
