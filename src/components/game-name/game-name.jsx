import {Wrapper} from './game-name.style';

export default function GameName({path, name}) {
    return (
        <a href={path}>
            <Wrapper>
                {name}
            </Wrapper>
        </a>
    )
}