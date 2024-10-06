import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {SituationTypes} from '../../constants'

import CardGroup from "../../components/card-group/card-group";
import {PrimaryButton} from '../../components/button/button.style';

import {Action} from '../../redux/common_card_slice';

import {canCardBeAddedToRound, getLastRoundCard, isFirstHigherCard, isTrump} from "../../utils/durak-utils";
import {changeTurnAttack, changeTurnWalk} from "../../redux/gameDetailsSlice";
import {StoreNames} from "../../redux/type";

export function UserCards({handleSetMoveCard, passRound, moveRoundTo}) {
    const trump = useSelector(state => state.gameDetails.trump);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const userCards = useSelector((state) => state[StoreNames.USER_CARDS].value);

    const dispatch = useDispatch();

    function manageCard(cardToMove, _clickedCardXY) {
        handleSetMoveCard(_clickedCardXY)

        const filteredUserCards = userCards.filter(card => card !== cardToMove)
        dispatch(Action.User.init(filteredUserCards))
        dispatch(Action.Round.addCard(cardToMove))
        dispatch(changeTurnWalk())
    }

    function handleCardClick(clickedCard) {
        return event => {
            if (isComputerWalk) {
                alert('Computer walk.')
                return;
            }

            const fromLeft = event?.clientX;
            const fromTop = event?.clientY;

            const toLeft = 0;
            const toTop = 0;

            const _clickedCardXY = {...clickedCard, fromLeft, fromTop}
            console.log(444444444444, {event, _clickedCardXY})

            // It's first card from user everything is simple
            if (!roundCards.length) {
                manageCard(clickedCard, _clickedCardXY)
                return;
            }

            //if user defence
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
                    return manageCard(clickedCard, _clickedCardXY)
                }

                //clickedCard isn't higher and isn't trump
                return;
            }

            //User attack
            if (!isComputerAttack && canCardBeAddedToRound(roundCards, clickedCard)) {
                return manageCard(clickedCard, _clickedCardXY)
            }
        }
    }

     function takeCards() {
        if (!isComputerAttack) {
            return;
        }
        moveRoundTo(SituationTypes.USER_LOST_ROUND)
        dispatch(changeTurnWalk())
    }

    return (
        <>
            <CardGroup
                cards={userCards}
                handleCardClick={handleCardClick}
                // ownerName="User cards"
                trump={trump}
                isEnabledWalk={!isComputerWalk}
            />

            <div>
                {
                    !isComputerAttack &&
                    !!roundCards.length &&
                    roundCards.length % 2 === 0 && //computer should cover card before we let it go to trash
                    <PrimaryButton onClick={passRound}>Відбій</PrimaryButton>
                }

                {isComputerAttack && !!roundCards.length &&
                    <PrimaryButton onClick={takeCards}>Забрав</PrimaryButton>}
            </div>
        </>
    )
}
