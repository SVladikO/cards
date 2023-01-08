import {Wrapper, Owner, Count} from './CardGroup.style'

import Card from "../card";

function CardGroup({
                       cards,
                       handleClick = () => {},
                       ownerName,
                       trump
                   }) {
    console.log('Rerender CardGroup')
    return (
        <Wrapper>
            {cards.map(c =>
                <Card
                    key={c.title + c.suit}
                    card={c}
                    handleClick={handleClick(c)}
                    isTrump={c.suit === trump}
                />
            )}
        </Wrapper>
    );
}

export default CardGroup;
