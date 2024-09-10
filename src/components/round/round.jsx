import {
    Wrapper,
    CardsWrapper,
    CardPairWrapper,
} from './round.style'

import Card from "../card/card";
import CardEmpty from "../card-empty/card-empty";
import {maxCardsPerRound} from "../../constants";

function Round({cards, isComputerAttack}) {
    const attackCards = cards.filter((card, index) => index % 2 === 0)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const defenceCards = cards.filter((card, index) => index % 2 === 1)
        .map(c => <Card key={c.title + c.suit} card={c}/>);

    const emptyCards = maxCardsPerRound - attackCards.length;

    for (let i = 0; i < emptyCards; i++) {
        attackCards.push(<CardEmpty/>)
    }

    return (
        <Wrapper className="round-wrapper">
            {attackCards.map((attackCard, index) => (
                <CardPairWrapper className="card-pair-wrapper">
                    <div>{attackCard}</div>
                    <div>{defenceCards[index]}</div>
                </CardPairWrapper>
            ))
            }
        </Wrapper>
    )
}

export default Round;
