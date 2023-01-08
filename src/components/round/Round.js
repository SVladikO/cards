import {
    Wrapper,
    Count,
    Title,
    BottomPart,
    Button,
    AttackRowWrapper,
    DefenceRowWrapper,
    Message
} from './Round.style'
import {ReactComponent as DeleteIcon} from "../../delete.svg";
import {ReactComponent as HandIcon} from "../../hand.svg";
import Card from "../card";

function Round({cards, handlePass, handleTake, isComputerAttack, walkMessage, attackMessage}) {
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
            <BottomPart>
                {!isComputerAttack && <Button onClick={handlePass}>Pass <DeleteIcon/></Button>}
                {isComputerAttack && <Button onClick={handleTake}>Take <HandIcon/></Button>}
            </BottomPart>
            <Message>Attack {attackMessage}/ Walk {walkMessage}</Message>
        </Wrapper>
    );
}

export default Round;
