import {Wrapper, CardAbstractWrapper} from './card-group.style'

import Card from "../card/card";

function CardGroup({
                       isSelected,
                       cards,
                       handleClick = () => {},
                       trump,
                       handleDeleteComputerCard,
                       handleAddCardToComputer,
                   }) {
    return (
        <Wrapper className="card-group" isSelected={isSelected}>
            {cards.map((c, index) =>
                <CardAbstractWrapper key={c.title + c.suit} index={index + 1}>
                    {handleDeleteComputerCard && <button onClick={() => handleDeleteComputerCard(index)}>-</button>}
                    {handleAddCardToComputer && <button onClick={() => handleAddCardToComputer(index)}>+</button>}
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
