import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Action} from '../redux/common_card_slice';
import {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk
} from "../redux/gameDetailsSlice";
import {useInterval} from '../hooks'
import {Table} from './PlayRoom.style';

import {findHigherCard, prepareCardsTo, canCardBeAddedToRound} from '../utils'
import CardGroup from '../components/card_group';


import {suits, data} from "../data";
import {
    SituationTypes,
    MESSAGE,
} from '../constants'

import {UserCards} from "../features/user_cards/UserCards";
import {ComputerCards} from "../features/computer_cards/ComputerCards";
import Round from "../components/round/Round";
import {StoreNames} from "../redux/type";

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

let userCards = []

let trump = getTrump();

function App() {
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);
    const computerCards = useSelector(state => state[StoreNames.COMPUTER_CARDS].value);
    const userCards = useSelector(state => state[StoreNames.USER_CARDS].value);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const coloda = useSelector((state) => state[StoreNames.COLODA_CARDS].value);
    const trash = useSelector((state) => state[StoreNames.TRASH_CARDS].value);
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(true);
    const [message, setMessage] = useState()

    useEffect(() => {
        dispatch(Action.Coloda.init(initCards()))
    }, [])
    const getLastRoundCard = () => roundCards[roundCards.length - 1];


    const addCardsToPlayers = status => {
        let newCardsToUser = []
        let newCardsToComputer = []
        let cutedColoda = []

        //We use this structure because we lost cards
        switch (status) {
            case SituationTypes.COMPUTER_LOST_ROUND:
                [newCardsToUser, cutedColoda] = prepareCardsTo(userCards, coloda);
                break;
            case SituationTypes.USER_LOST_ROUND:
                [newCardsToComputer, cutedColoda] = prepareCardsTo(computerCards, coloda);
                break;
            case SituationTypes.START_GAME:
            case SituationTypes.MOVE_ROUND_TO_TRASH:
                [newCardsToUser, cutedColoda] = prepareCardsTo(userCards, coloda);
                [newCardsToComputer, cutedColoda] = prepareCardsTo(computerCards, cutedColoda)
                break;
        }

        dispatch(Action.User.addCards(newCardsToUser))
        dispatch(Action.Coloda.init(cutedColoda))
        dispatch(Action.Computer.addCards(sort(newCardsToComputer)));
    }


    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);

        // Set which turn to attack
        const isComputerTurn = getRandomInt(2) === 0;
        dispatch(setIsComputerTurnAttack(true)) //isComputerTurn));
        dispatch(setIsComputerTurnWalk(true)) //isComputerTurn));

        //Init cards.
        addCardsToPlayers(SituationTypes.START_GAME)
    }


    function manageCard(cardToMove) {
        const filtered = computerCards.filter(card => card !== cardToMove)

        dispatch(Action.Computer.init(filtered))
        dispatch(Action.Round.addCard(cardToMove))
        dispatch(changeTurnWalk())
    }


    function moveRoundTo(status) {
        switch (status) {
            case SituationTypes.COMPUTER_LOST_ROUND:
                dispatch(Action.Computer.addCards(roundCards));
                // It gives possibility to user attack in the next round when computer lost current.
                dispatch(changeTurnWalk())
                break;
            case SituationTypes.USER_LOST_ROUND:
                dispatch(Action.User.addCards(roundCards));
                break;
            case SituationTypes.MOVE_ROUND_TO_TRASH:
                dispatch(Action.Trash.addCards(roundCards))
                break;
        }

        dispatch(Action.Round.init([]))
        addCardsToPlayers(status)
    }

    function passRound() {
        if (roundCards.length % 2 === 0 && roundCards.length >= 2) {
            moveRoundTo(SituationTypes.MOVE_ROUND_TO_TRASH);
            dispatch(changeTurnAttack())
            dispatch(changeTurnWalk())
        }
    }

    function takeCards() {
        moveRoundTo(SituationTypes.USER_LOST_ROUND)
        dispatch(changeTurnWalk())
    }

    function computerAttack() {

        if (!computerCards.length) {
            return console.log('Computer cant attack without cards')
        }

        // Start of attack
        if (!roundCards.length) {
            return manageCard(computerCards[0]);
        }

        const cardCandidate = computerCards.find(card => canCardBeAddedToRound(roundCards, card))
        console.log('COMPUTER ATTACK. candidate', cardCandidate)
        // If nothing to add computer will pass round
        if (!cardCandidate) {
            return passRound()
        }

        manageCard(cardCandidate)
    }

    function computerDefence() {
        const cardToCover = getLastRoundCard();
        const higherCard = findHigherCard(computerCards, cardToCover)

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
                console.log('Defence')
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
            <Round cards={roundCards} handlePass={passRound} handleTake={takeCards}/>
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


// function showEndGameMessage() {
//     const endColoda = coloda.length === 0;
//
//     if (!endColoda) {
//         return;
//     }
//
//     const endUserCards = userCards.filter(c => !c.hide).length === 0;
//     const endComputerCards = computerCards.filter(c => !c.hide).length === 0;
//
//     if (endComputerCards && endUserCards) {
//         return setMessage(MESSAGE.DRAW);
//     }
//
//     if (endComputerCards) {
//         return setMessage(MESSAGE.COMPUTER_WON)
//     }
//
//     if (endUserCards) {
//         return setMessage(MESSAGE.USER_WON)
//     }
// }