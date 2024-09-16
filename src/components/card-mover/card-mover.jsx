import {Wrapper} from "./card-mover.style";
import Card from '../card/card';

export default function CardMover({moveCard}) {
    return (
        <Wrapper
            fromLeft={moveCard.fromLeft}
            fromTop={moveCard.fromTop}
            toLeft={0}
            toTop={0}
        >
            <Card card={moveCard} />
        </Wrapper>
    )
}