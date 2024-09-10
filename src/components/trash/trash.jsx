import {Wrapper} from './trash.style';

import CardCounter from '../card-counter/card-counter';
import CardCoverage from "../card-coverage/card-coverage";

export default function Trash({amount}) {
    return (
        <Wrapper>
            <CardCoverage />
            <CardCounter>{amount}</CardCounter>
        </Wrapper>
    )
}