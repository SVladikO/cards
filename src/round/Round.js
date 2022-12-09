import {Wrapper, Count, Button} from './Round.style'

import Card from "../card";

function Round({cards, handlePass}) {
    return (
        <div>
            {cards.map(c => <Card key={c.title + c.suit} card={c} />)}
            <div>{cards.length}</div>
            <div onClick={handlePass}>Pass</div>
        </div>
    );
}

export default Round;
