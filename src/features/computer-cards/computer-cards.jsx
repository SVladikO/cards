import {useInterval} from '../../hooks'
import {useDispatch, useSelector} from "react-redux";

import {Action} from '../../redux/common_card_slice';
import {StoreNames} from "../../redux/type";
import {changeTurnWalk} from "../../redux/gameDetailsSlice";

import Player from '../../components/player/player';
import CardGroup from "../../components/card-group/card-group";

import {sortTrumpToEnd, getLastRoundCard, findHigherCard, findHigherTrumpCard, canCardBeAddedToRound} from '../../utils/durak-utils';

export default function ComputerCards({passRound}) {
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

        const [usualCards, trumpCards] = sortTrumpToEnd(computerCards, trump)

        // Start of attack
        if (!roundCards.length) {
            return manageCard(usualCards[0] || trumpCards[0]);
        }

        let cardCandidate = usualCards.find(card => canCardBeAddedToRound(roundCards, card))

        if (!cardCandidate && (colodaCards.length < 4 || roundCards.length > 8)) {
            cardCandidate = trumpCards.find(card => canCardBeAddedToRound(roundCards, card))
        }

        // If nothing to add computer will pass round
        if (!cardCandidate || (cardCandidate.level > 10 && colodaCards.length < 10)) {
            return passRound()
        }

        manageCard(cardCandidate)
    }

    function computerDefence() {
        const cardToCover = getLastRoundCard(roundCards);

        const [usualCards, trumpCards] = sortTrumpToEnd(computerCards, trump)

        let higherCard = findHigherCard(usualCards, cardToCover, trump);
        if (!higherCard) {
            higherCard = findHigherTrumpCard(trumpCards, cardToCover, trump);
        }

        //Cover usual card by trump.
        if (!higherCard && trumpCards.length) {
            higherCard = trumpCards[0]
        }

        if (!higherCard) {
            return moveRoundTo(SituationTypes.COMPUTER_LOST_ROUND)
        }

        manageCard(higherCard)
    }

    useInterval(() => {
        console.log('useInterval')
        if (!colodaCards.length && userCards.length) {
            return alert('User won')
        }

        if (!colodaCards.length && computerCards.length) {
            return alert('Computer won')
        }

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
            <CardGroup cards={computerCards} />
        </>
    )
}
