import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {init as initUserCards} from './userCardsSlice';
import {addCard as addCardToRound} from '../round_cards/roundCardsSlice';
import CardGroup from "../../card_group";
import {COMPUTER_LOST_ROUND, TURN_ATTACK, maxRoundCards} from "../../constants";
import {canCardBeAddedToRound} from "../../utils";

export function UserCards() {
    const turnAttack = useSelector((state) => state.gameDetails.value);
    const roundCards = useSelector((state) => state.roundCards.value);
    const userCards = useSelector((state) => state.userCards.value);
    const dispatch = useDispatch();

    console.log({userCards})

    function sendCard(cardToSend) {
        return () => {

            if (cardToSend.hide || TURN_ATTACK.COMPUTER === turnAttack) {
                return;
            }

            if (canCardBeAddedToRound(roundCards, cardToSend)) {
                dispatch(addCardToRound(cardToSend))
                const filteredUserCards = userCards.filter(card => card !== cardToSend)
                dispatch(initUserCards(filteredUserCards))
                return;
            }

            // Show warning if user want to add wrong card
            // if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover)) {
                // userCards = userCards.map(card => card === cardToCover ? {...card} : card)

                // return turnOffWarningFrom(userCards, cards => userCards = cards);
            // }

            // //.hide mean it was used before
            // cardToCover.hide = true;

            // switch (turnAttack) {
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