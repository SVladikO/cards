import {Wrapper, InnerWrapper} from "./trump.style";

import Card from "../card/card";
import CardCoverage from "../card-coverage/card-coverage";
import CardCounter from "../card-counter/card-counter";

export default function Trump({trumpCard, cardCount}) {
    return (
        <Wrapper className="trump">
            <InnerWrapper className="trump">
                <Card card={trumpCard}/>
                <CardCoverage/>
            </InnerWrapper>
            <CardCounter>{cardCount}</CardCounter>
        </Wrapper>
    )
}