import {Wrapper} from './players-amount.style';

import {GameDescription} from '../text/text.style';
import CardEmpty from '../card-empty/card-empty';

export default function PlayersAmount() {
    return (
        <>
            <GameDescription>Оберіть кількість гравців</GameDescription>
            <Wrapper>
                <CardEmpty>2</CardEmpty>
                <CardEmpty>3</CardEmpty>
                <CardEmpty>4</CardEmpty>
                <CardEmpty>5</CardEmpty>
            </Wrapper>
        </>
    )
}
