import React from "react";
import {useSelector, useDispatch} from "react-redux";

import CardGroup from "../../card_group";

import {initUserCards} from './userCardsSlice';
import {addCardToRound} from '../round_cards/roundCardsSlice';

import {canCardBeAddedToRound, findHigherCard} from "../../utils";
import {changeTurnAttack, changeTurnWalk} from "../game_details/gameDetailsSlice";

export function UserCards() {
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const roundCards = useSelector((state) => state.roundCards.value);
    const userCards = useSelector((state) => state.userCards.value);
    const dispatch = useDispatch();

    function manageCard(cardToMove) {
        const filteredUserCards = userCards.filter(card => card !== cardToMove)

        dispatch(initUserCards(filteredUserCards))
        dispatch(addCardToRound(cardToMove))
        dispatch(changeTurnWalk())
    }

    function sendCard(clickedCard) {
        return () => {
            if (isComputerWalk) {
                return;
            }

            // User send first card on a table
            if (!roundCards.length) {
                manageCard(clickedCard)
                return;
            }

            //User defence
            // We take last card from computer and check "Does user have higher card?"
            let cardToBit = roundCards[roundCards.length-1]
            let higherCard = findHigherCard(userCards, cardToBit)

            if (isComputerAttack && higherCard) {
                return manageCard(higherCard)
            }

            //User attack
            if (isComputerAttack && canCardBeAddedToRound(clickedCard)) {
                return manageCard(clickedCard)
            }

            // Show warning if user want to add wrong card
            // if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover)) {
                // userCards = userCards.map(card => card === cardToCover ? {...card} : card)

                // return turnOffWarningFrom(userCards, cards => userCards = cards);
            // }

            // //.hide mean it was used before
            // cardToCover.hide = true;

            // switch (isComputerAttack) {
            //     case USER_TURN_ATTACK:
            //         let computerHigherCard = findHigherCard(computerCards, cardToSend)
            //         //Beat by trump
            //         computerHigherCard = computerHigherCard || findHigherTrumpCard(computerCards, cardToSend, trump)
            //
            //         // If higherCard doesn't exist
            //         if (!computerHigherCard || roundCards.length >= maxRoundCards) {
            //             roundCards = disableCardsHide([...roundCards, cardToSend]);
            //             return endRound(COMPUTER_LOST_ROUND);
            //         }
            //
            //         computerHigherCard.hide = true;
            //         roundCards = [...roundCards, cardToSend, computerHigherCard];

                // case COMPUTER_TURN_ATTACK:
                //     let userHigherCard = findHigherCard(userCards, cardToCover)
                //     //Beat by trump
                //     userHigherCard = userHigherCard || findHigherTrumpCard(userCards, cardToCover, trump);
                //
                //     if (userHigherCard) {
                //         userHigherCard.hide = true;
                //         roundCards = [...roundCards, userHigherCard];
                //         return;
                //     }
                //
                //     roundCards = [];
                //     userCards = disableCardsHide([...userCards, ...roundCards]);
                //     break;
            // }

            // showEndGameMessage()
        }
    }

    return <CardGroup cards={userCards} handleClick={sendCard}/>;
}