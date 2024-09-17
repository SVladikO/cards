import {useInterval} from '../../hooks'
import {useDispatch, useSelector} from "react-redux";

import {Action} from '../../redux/common_card_slice';
import {StoreNames} from "../../redux/type";
import {changeTurnWalk} from "../../redux/gameDetailsSlice";

import {SituationTypes} from '../../constants'

import Player from '../../components/player/player';
import CardGroup from "../../components/card-group/card-group";

import {getHigherCard, getLowerCard} from '../../utils/durak-utils';

export default function ComputerCards({passRound, moveRoundTo}) {
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);

    const trump = useSelector(state => state.gameDetails.trump);
    const computerCards = useSelector(state => state[StoreNames.COMPUTER_CARDS].value);
    const userCards = useSelector(state => state[StoreNames.USER_CARDS].value);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const colodaCards = useSelector((state) => state[StoreNames.COLODA_CARDS].value);
    const dispatch = useDispatch();

    function manageCard(cardToMove) {
        const filtered = computerCards.filter(card => card !== cardToMove)
        dispatch(Action.Computer.init(filtered))
        dispatch(Action.Round.addCard(cardToMove))
        dispatch(changeTurnWalk())
        // handleSetMoveCard(cardToMove);
    }

    function computerAttack() {
        if (!computerCards.length) {
            return
        }

        const cardCandidate = getLowerCard(roundCards, computerCards, trump);

        // If nothing to add computer will pass round
        if (!cardCandidate) {
            return passRound()
        }

        manageCard(cardCandidate)
    }

    function computerDefence() {
        let higherCard = getHigherCard(roundCards, computerCards, trump);

        if (!higherCard) {
            return moveRoundTo(SituationTypes.COMPUTER_LOST_ROUND)
        }

        manageCard(higherCard)
    }

    useInterval(() => {
        if (isComputerWalk) {
            if (isComputerAttack) {
                computerAttack()
            } else {
                computerDefence()
            }
        }
    }, 4000)

    return (
        <>
            {<Player isWalk={isComputerWalk} owner="Computer"/>}
            <CardGroup cards={computerCards} isEnabledWalk={isComputerWalk}/>
        </>
    )
}
