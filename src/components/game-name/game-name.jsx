import {Wrapper} from './game-name.style';
import app from "../../App";

export default function GameName({path, name}) {
    return (
        <a href={path}>
            <Wrapper>
                {name}
            </Wrapper>
        </a>
    )
}