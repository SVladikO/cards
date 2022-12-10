import {Wrapper, Count, Title, Button, Button2, AttackRowWrapper, DefenceRowWrapper, Message} from './Round.style'

import Card from "../card";

function Round({cards, handlePass, handleTake, walkMessage, attackMessage}) {
    const attackCards = cards.filter((card, index) => index % 2 === 0);
    const defenceCards = cards.filter((card, index) => index % 2 === 1);
    return (
        <Wrapper>
            <AttackRowWrapper>
                {attackCards.map(c => <Card key={c.title + c.suit} card={c}/>)}
            </AttackRowWrapper>
            <DefenceRowWrapper>
                {defenceCards.map(c => <Card key={c.title + c.suit} card={c}/>)}
            </DefenceRowWrapper>
            <Count>{cards.length}</Count>
            <Title>Round cards</Title>
            <Button onClick={handlePass}>Pass</Button>
            <Button2 onClick={handleTake}>Take</Button2>
            <Message>Attack {attackMessage}/ Walk {walkMessage}</Message>
        </Wrapper>
    );
}

export default Round;
