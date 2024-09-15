import {Wrapper, Message} from "./walk-message.style";

export default function WalkMessage({isComputerAttack, isComputerWalk}) {

    return (
        <Wrapper>
            {isComputerAttack && !isComputerWalk && <Message>Бийся, як лев!</Message>}
            {!isComputerAttack && !isComputerWalk && <Message>Ваш хід.</Message>}
            {isComputerAttack && isComputerWalk && <Message> Ходить компютер.</Message>}
        </Wrapper>
    )
}
