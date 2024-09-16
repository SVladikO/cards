import {Wrapper, Message} from "./walk-message.style";
import {useSelector} from "react-redux";

export default function WalkMessage() {
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);

    return (
        <Wrapper>
            {isComputerAttack && !isComputerWalk && <Message>Бийся, як лев!</Message>}
            {!isComputerAttack && !isComputerWalk && <Message>Ваш хід.</Message>}
            {isComputerAttack && isComputerWalk && <Message> Ходить компютер.</Message>}
        </Wrapper>
    )
}
