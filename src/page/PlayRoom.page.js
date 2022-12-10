import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initUserCards} from '../features/user_cards/userCardsSlice';
import {initRoundCards, addCardToRound} from '../features/round_cards/roundCardsSlice';
import {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk
} from "../features/game_details/gameDetailsSlice";
import {useInterval} from '../hooks'
import {Table} from './PlayRoom.style';

import {findHigherCard, isTrumpCard, findHigherTrumpCard, addCardsTo} from '../utils'
import CardGroup from '../card_group';


import {suits, data} from "../data";
import {
    USER_LOST_ROUND,
    COMPUTER_LOST_ROUND,
    MOVE_ROUND_TO_TRASH,
    MESSAGE,
} from '../constants'

import {UserCards} from "../features/user_cards/UserCards";
import {ComputerCards} from "../features/computer_cards/ComputerCards";
import {initComputerCards} from "../features/computer_cards/computerCardsSlice";
import Round from "../round/Round";

const log = console.log;



function initCards() {
    const result = [];

    data.forEach(card =>
        suits.forEach(suit =>
            result.push({...card, ...suit})
        )
    )

    // Mix data array
    result.sort(() => Math.random() - 0.5);
    return result;
}

const sort = cards => cards.sort((f, s) => f.level - s.level);
const getTrump = () => suits.map(s => s.suit)[getRandomInt(4)];
const getRandomInt = max => Math.floor(Math.random() * max);

function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}

const getSuit = card => card.title + card.suit;

let roundCards = [];
let userCards = []

let trump = getTrump();
let coloda = initCards();
let trash = []

function App() {
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);
    const computerCards = useSelector(state => state.computerCards.value);
    const realRoundCards = useSelector((state) => state.roundCards.value);
    const dispatch = useDispatch();

    const addCardsToPlayer = (to) => {
        const [_updatedCards, cutedColoda] = addCardsTo(to, coloda)
        coloda = cutedColoda;

        return _updatedCards;
    }

    const [showMenu, setShowMenu] = useState(true);
    const [message, setMessage] = useState()

    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);

        // Set which turn to attack
        const isComputerTurn = getRandomInt(2) === 0;
        dispatch(setIsComputerTurnAttack(isComputerTurn));
        dispatch(setIsComputerTurnWalk(isComputerTurn));

        addCardsAfterRound()

    }

    const getIs = () => isComputerWalk


    function getLastRoundCard() {
        return realRoundCards[realRoundCards.length - 1];
    }



    function manageCard(cardToMove) {
        const filtered = computerCards.filter(card => card !== cardToMove)

        dispatch(initComputerCards(filtered))
        dispatch(addCardToRound(cardToMove))
        dispatch(changeTurnWalk())
    }


    function showEndGameMessage() {
        const endColoda = coloda.length === 0;

        if (!endColoda) {
            return;
        }

        const endUserCards = userCards.filter(c => !c.hide).length === 0;
        const endComputerCards = computerCards.filter(c => !c.hide).length === 0;

        if (endComputerCards && endUserCards) {
            return setMessage(MESSAGE.DRAW);
        }

        if (endComputerCards) {
            return setMessage(MESSAGE.COMPUTER_WON)
        }

        if (endUserCards) {
            return setMessage(MESSAGE.USER_WON)
        }
    }

    function moveRoundTo(status) {
        alert(COMPUTER_LOST_ROUND)

        switch (status) {
            case COMPUTER_LOST_ROUND:
                dispatch(initComputerCards([...computerCards, ...roundCards]));
                break;
            case USER_LOST_ROUND:
                dispatch(initUserCards([...userCards, ...roundCards]));
                break;
            case MOVE_ROUND_TO_TRASH:
                trash = [...trash, ...roundCards];
                break;
        }
    }

    function addCardsAfterRound(status) {
        dispatch(initRoundCards([]));
        dispatch(initUserCards(sort(addCardsToPlayer(userCards))))
        dispatch(initComputerCards(sort(addCardsToPlayer(computerCards))));
        roundCards = [];
    }

    function passRound() {
        if (roundCards.length % 2 === 0 && roundCards.length >= 2) {
            moveRoundTo(MOVE_ROUND_TO_TRASH);
            addCardsAfterRound()
        }
    }

    function computerAttack() {

        // manageCard(cardToSend)

    }
    function computerDefence() {
        const cardToCover = getLastRoundCard();
        const higherCard = findHigherCard(computerCards, cardToCover)

        if (!higherCard) {
           return moveRoundTo(COMPUTER_LOST_ROUND)
        }

        manageCard(higherCard)
    }

    useInterval(() => {
        console.log('Opppa', getIs(), isComputerAttack, isComputerWalk);

        //Computer will attack
        if (isComputerWalk) {
            if (isComputerAttack) {
                console.log('Computer attack')
                computerAttack()
            }

            //Computer will defence
            if (!isComputerAttack) {
                console.log('Computer defence')
                computerDefence()

            }
        }

    }, 2000)


    return (
        <Table>
            {showMenu && <button onClick={startGame}>Start Game</button>}
            <ComputerCards/>
            <CardGroup ownerName='Coloda' cards={coloda}/>
            <CardGroup ownerName='Trush' cards={trash}/>
            <div>Trump: {trump}</div>
            <Round cards={realRoundCards} handlePass={() => moveRoundTo(MOVE_ROUND_TO_TRASH)}/>
            {/*<Table cards={roundCards} handlePass={passRound}/>*/}
            {isComputerAttack ? "Computer attack  /" : 'User attack  /'}
            {isComputerWalk ? "Computer walk   " : 'User walk  '}
            <UserCards/>
            {/*<CardGroup cards={userCards} handleClick={sendCard}/>*/}
            <div>{message}</div>
        </Table>
    );
}

export default App;
