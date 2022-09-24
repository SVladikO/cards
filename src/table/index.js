import {Wrapper, Count, Button} from './Table.style'

import Card from "../card";

function Table({cards, handlePass}) {
    return (
        <Wrapper>
            {
                cards.map(c => <Card key={c.title + c.suit} card={c} />)
            }
            <Count>{cards.length}</Count>
            <Button onClick={handlePass}>Pass</Button>
        </Wrapper>
    );
}

export default Table;
