import {Wrapper, CardAbstractWrapper, TopWrapper} from './card-group.style'

import Card from "../card/card";

function CardGroup({
                       isSelected,
                       cards,
                       handleCardClick = () => {
                       },
                       trump,
                       isEnabledWalk,
                       children
                   }) {
    return (
        <TopWrapper>
            {children}
            <Wrapper className="card-group" isSelected={isSelected} isEnabledWalk={isEnabledWalk}>
                {cards.map((c, index) =>
                    <CardAbstractWrapper key={c.title + c.suit} index={index + 1}>
                        <Card
                            card={c}
                            handleClick={handleCardClick(c)}
                            isTrump={c.suit === trump}
                        />
                    </CardAbstractWrapper>
                )}
            </Wrapper>
        </TopWrapper>
    );
}

export default CardGroup;
