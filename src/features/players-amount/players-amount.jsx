import {Wrapper} from './players-amount.style';

import {GameDescription} from '../../components/text/text.style';
import CardEmpty from '../../components/card-empty/card-empty';

export default function PlayersAmount() {
    return (
        <>
            <GameDescription>Оберіть кількість гравців</GameDescription>
            <Wrapper>
                <CardEmpty>2</CardEmpty>
                <CardEmpty isSelected>3</CardEmpty>
                <CardEmpty>4</CardEmpty>
                <CardEmpty>5</CardEmpty>
            </Wrapper>
        </>
    )
}
