import {
    Wrapper,
    Count,
    Title,
    BottomPart,
    Button,
    AttackRowWrapper,
    DefenceRowWrapper,
    Message,
    EmptyCard,
} from './Round.style'
import {ReactComponent as DeleteIcon} from "../../delete.svg";
import {ReactComponent as HandIcon} from "../../hand.svg";
import Card from "../card";
import {maxCardsPerRound} from "../../constants";

function Round({cards, handlePass, handleTake, isComputerAttack, walkMessage, attackMessage}) {
    const attackCards = cards.filter((card, index) => index % 2 === 0)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const defenceCards = cards.filter((card, index) => index % 2 === 1)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const emptyCards = maxCardsPerRound - attackCards.length;

    for (let i = 0; i < emptyCards; i++) {
        attackCards.push(<EmptyCard/>)
    }

    return (
        <Wrapper>
            <AttackRowWrapper>{attackCards}</AttackRowWrapper>
            <DefenceRowWrapper>{defenceCards}</DefenceRowWrapper>
            <Count>{cards.length}</Count>
            <Title>Round cards</Title>
            <BottomPart>
                {!isComputerAttack && <Button onClick={handlePass}>Pass <DeleteIcon/></Button>}
                {isComputerAttack && <Button onClick={handleTake}>Take <HandIcon/></Button>}
            </BottomPart>
            <Message>Attack {attackMessage}/ Walk {walkMessage}</Message>
        </Wrapper>
    );
}

export default Round;
