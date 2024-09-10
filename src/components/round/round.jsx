import {
    Wrapper,
    CardsWrapper,
    CardPairWrapper,
    TrumpWrapper,
    EmptyCard,
} from './round.style'

import Card from "../card/card";
import {maxCardsPerRound} from "../../constants";

function Round({cards, isComputerAttack, trumpCard, showMenu}) {
    const attackCards = cards.filter((card, index) => index % 2 === 0)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const defenceCards = cards.filter((card, index) => index % 2 === 1)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const emptyCards = maxCardsPerRound - attackCards.length;

    for (let i = 0; i < emptyCards; i++) {
        attackCards.push(<EmptyCard/>)
    }

    return (
        <Wrapper className="round-inner-wrapper">
            {!showMenu && <TrumpWrapper className="trump">
                <Card card={trumpCard}/>
                {/*<EmptyCard/>*/}
            </TrumpWrapper>
            }

            <CardsWrapper className="card-wrapper" isComputerAttack={isComputerAttack}>
                {attackCards.map((attackCard, index) => (
                    <CardPairWrapper className="card-pair-wrapper">
                        <div>{attackCard}</div>
                        <div>{defenceCards[index]}</div>
                    </CardPairWrapper>
                ))
                }
            </CardsWrapper>
        </Wrapper>
    )
        ;
}

export default Round;
