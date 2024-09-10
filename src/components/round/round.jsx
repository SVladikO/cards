import {
    Wrapper,
    InnerWrapper,
    Count,
    CardsWrapper,
    Title,
    BottomPart,
    Button,
    CardPairWrapper,
    AttackRowWrapper,
    DefenceRowWrapper,
    TrumpWrapper,
    Message,
    EmptyCard,
} from './round.style'
import {ReactComponent as DeleteIcon} from "../../delete.svg";
import {ReactComponent as HandIcon} from "../../hand.svg";
import Card from "../card/card";
import {maxCardsPerRound} from "../../constants";

function Round({cards, handlePass, handleTake, isComputerAttack, trumpCard, walkMessage, attackMessage, showMenu}) {
    const attackCards = cards.filter((card, index) => index % 2 === 0)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const defenceCards = cards.filter((card, index) => index % 2 === 1)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const emptyCards = maxCardsPerRound - attackCards.length;

    for (let i = 0; i < emptyCards; i++) {
        attackCards.push(<EmptyCard/>)
    }

    return (
        <Wrapper className="round-wrapper">
            <InnerWrapper className="round-inner-wrapper">
                {!showMenu && <TrumpWrapper className="trump">
                    <Card card={trumpCard}/>
                    <EmptyCard/>
                </TrumpWrapper>
                }

                <CardsWrapper className="card-wrapper" isComputerAttack={isComputerAttack}>
                    {/*<AttackRowWrapper className="attack-cards">{attackCards}</AttackRowWrapper>*/}
                    {/*<DefenceRowWrapper className="defence-cards">{defenceCards}</DefenceRowWrapper>*/}

                    {attackCards.map((attackCard, index) => (
                        <CardPairWrapper className="card-pair-wrapper">
                            <div>{attackCard}</div>
                            <div>{defenceCards[index]}</div>
                        </CardPairWrapper>
                    ))
                    }
                </CardsWrapper>

            </InnerWrapper>
            {!showMenu && (
                <>
                    <Message>Attack {attackMessage}/ Walk {walkMessage}</Message>
                    <BottomPart>
                        {!isComputerAttack && <DeleteIcon onClick={handlePass}/>}
                        {isComputerAttack && <HandIcon onClick={handleTake}/>}
                    </BottomPart>
                </>)}
        </Wrapper>
    )
        ;
}

export default Round;
