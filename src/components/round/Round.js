import {
    Wrapper,
    Count,
    CardsWrapper,
    Title,
    BottomPart,
    Button,
    AttackRowWrapper,
    DefenceRowWrapper,
    TrumpWrapper,
    Message,
    EmptyCard,
} from './Round.style'
import {ReactComponent as DeleteIcon} from "../../delete.svg";
import {ReactComponent as HandIcon} from "../../hand.svg";
import Card from "../card";
import {maxCardsPerRound} from "../../constants";

function Round({cards, handlePass, handleTake, isComputerAttack, trumpCard, walkMessage, attackMessage}) {
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
            <CardsWrapper isComputerAttack={isComputerAttack}>
                <AttackRowWrapper>{attackCards}</AttackRowWrapper>
                <DefenceRowWrapper>{defenceCards}</DefenceRowWrapper>
            </CardsWrapper>
            <TrumpWrapper>
                <Card card={trumpCard}/>
                <EmptyCard/>
            </TrumpWrapper>
            <Message>Attack {attackMessage}/ Walk {walkMessage}</Message>
            <BottomPart>
                {!isComputerAttack && <DeleteIcon onClick={handlePass}/>}
                {isComputerAttack && <HandIcon onClick={handleTake}/>}
            </BottomPart>
        </Wrapper>
    );
}

export default Round;
