import {Wrapper} from './Table.style'

import Card from "../card";

function Table({cards}) {
    return (
        <Wrapper>
            {
                cards.map(c => <Card key={c.title + c.suit} card={c} />)
            }
        </Wrapper>
    );
}

export default Table;
