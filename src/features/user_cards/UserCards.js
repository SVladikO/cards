import React from "react";
import {useSelector, useDispatch} from "react-redux";

import CardGroup from "../../components/card_group";

import {Action} from '../../redux/common_card_slice';

import {canCardBeAddedToRound, getLastRoundCard, isFirstHigherCard, isTrump} from "../../utils";
import {changeTurnAttack, changeTurnWalk} from "../../redux/gameDetailsSlice";
import {StoreNames} from "../../redux/type";

export function UserCards() {
    const trump = useSelector(state => state.gameDetails.trump);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const userCards = useSelector((state) => state[StoreNames.USER_CARDS].value);

    const dispatch = useDispatch();

    function manageCard(cardToMove) {
        const filteredUserCards = userCards.filter(card => card !== cardToMove)
        dispatch(Action.User.init(filteredUserCards))
        dispatch(Action.Round.addCard(cardToMove))
        dispatch(changeTurnWalk())
    }

    function sendCard(clickedCard) {
        return () => {
            if (isComputerWalk) {
                alert('Computer walk.')
                return;
            }

            // User put first card on a table when his turn
            if (!roundCards.length) {
                manageCard(clickedCard)
                return;
            }


            //User defence logic
            if (isComputerAttack) {
                // We take last card from round and check "Does user have higher card?"
                let cardToBit = getLastRoundCard(roundCards);

                if (
                    (
                        isTrump(cardToBit, trump) &&
                        isTrump(clickedCard, trump) &&
                        isFirstHigherCard(clickedCard, cardToBit)
                    ) ||
                    (
                        isTrump(clickedCard, trump) &&
                        !isTrump(cardToBit, trump)
                    ) ||
                    (
                        isFirstHigherCard(clickedCard, cardToBit)
                    )
                ) {
                    return manageCard(clickedCard)
                }

                //clickedCard isn't higher and isn't trump
                return;
            }

            //User attack
            if (!isComputerAttack && canCardBeAddedToRound(roundCards, clickedCard)) {
                return manageCard(clickedCard)
            }
        }
    }

    return <CardGroup cards={userCards} handleClick={sendCard} ownerName="User cards"/>;
}