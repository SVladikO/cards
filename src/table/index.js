import {Wrapper, Count} from './Table.style'

import Card from "../card";

function Table({cards}) {
    return (
        <Wrapper>
            {
                cards.map(c => <Card key={c.title + c.suit} card={c} />)
            }
            <Count>{cards.length}</Count>
        </Wrapper>
    );
}

export default Table;
