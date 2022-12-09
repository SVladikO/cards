import {Wrapper, Count, Title, Button} from './Round.style'

import Card from "../card";

function Round({cards, handlePass}) {
    return (
        <Wrapper>
            {cards.map(c => <Card key={c.title + c.suit} card={c} />)}
            <Count>{cards.length}</Count>
            <Title>Round cards</Title>
            <Button onClick={handlePass}>Pass</Button>
        </Wrapper>
    );
}

export default Round;
