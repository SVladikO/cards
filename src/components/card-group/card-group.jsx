import {Wrapper, CardAbstractWrapper} from './card-group.style'

import Card from "../card/card";

function CardGroup({
                       isSelected,
                       cards,
                       handleClick = () => {
                       },
                       ownerName,
                       trump
                   }) {
    return (
        <Wrapper className="card-group" isSelected={isSelected}>
            {cards.map((c, index) =>
                <CardAbstractWrapper key={c.title + c.suit} index={index+1}>
                    <Card
                        card={c}
                        handleClick={handleClick(c)}
                        isTrump={c.suit === trump}
                    />
                </CardAbstractWrapper>
            )}
        </Wrapper>
    );
}

export default CardGroup;
