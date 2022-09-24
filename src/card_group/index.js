import {Wrapper} from './CardGroup.style'

import Card from "../card";

function CardGroup({cards, handleClick = () => {}}) {
    return (
        <Wrapper>
            { cards.map(c => <Card key={c.title + c.suit} card={c} handleClick={handleClick(c)}/>) }
        </Wrapper>
    );
}

export default CardGroup;
