import {Wrapper, Owner, Count} from './CardGroup.style'

import Card from "../card";

function CardGroup({
                       cards, handleClick = () => {
    }, ownerName
                   }) {
    return (
        <Wrapper>
            <Owner>{ownerName}:</Owner>
            {cards.map(c => <Card key={c.title + c.suit} card={c} handleClick={handleClick(c)}/>)}
            <Count>{cards.length}</Count>
        </Wrapper>
    );
}

export default CardGroup;
