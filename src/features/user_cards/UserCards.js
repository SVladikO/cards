import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateCards} from './userCardsSlice';
import CardGroup from "../../card_group";
import {COMPUTER_LOST_ROUND, COMPUTER_TURN_ATTACK, maxRoundCards, USER_TURN_ATTACK} from "../../constants";

export function UserCards() {
    const cards = useSelector((state) => state.userCards.value);
    const dispatch = useDispatch();

    console.log({cards})

    function sendCard(cardToCover) {
        return () => {

            if (cardToCover.hide) return;

            // Show warning if user want to add wrong card
            if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover) && COMPUTER_TURN_ATTACK !== turnAttack) {
                userCards = userCards.map(card => card === cardToCover ? {...card, warning: true} : card)

                return turnOffWarningFrom(userCards, cards => userCards = cards);
            }

            //.hide mean it was used before
            cardToCover.hide = true;

            switch (turnAttack) {
                case USER_TURN_ATTACK:
                    let computerHigherCard = findHigherCard(computerCards, cardToCover)
                    //Beat by trump
                    computerHigherCard = computerHigherCard || findHigherTrumpCard(computerCards, cardToCover, trump)

                    // If higherCard doesn't exist
                    if (!computerHigherCard || roundCards.length >= maxRoundCards) {
                        roundCards = disableCardsHide([...roundCards, cardToCover]);
                        return endRound(COMPUTER_LOST_ROUND);
                    }

                    computerHigherCard.hide = true;
                    roundCards = [...roundCards, cardToCover, computerHigherCard];

                    break;
                case COMPUTER_TURN_ATTACK:
                    let userHigherCard = findHigherCard(userCards, cardToCover)
                    //Beat by trump
                    userHigherCard = userHigherCard || findHigherTrumpCard(userCards, cardToCover, trump);

                    if (userHigherCard) {
                        userHigherCard.hide = true;
                        roundCards = [...roundCards, userHigherCard];
                        return;
                    }

                    roundCards = [];
                    userCards = disableCardsHide([...userCards, ...roundCards]);
                    break;
            }

            showEndGameMessage()
        }
    }

    return <CardGroup cards={cards}/>;
}