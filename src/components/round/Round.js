import {Wrapper, Count, Title, Button, Button2} from './Round.style'

import Card from "../card";

function Round({cards, handlePass, handleTake}) {
    return (
        <Wrapper>
            {cards.map(c => <Card key={c.title + c.suit} card={c} />)}
            <Count>{cards.length}</Count>
            <Title>Round cards</Title>
            <Button onClick={handlePass}>Pass</Button>
            <Button2 onClick={handleTake}>Take</Button2>
        </Wrapper>
    );
}

export default Round;
