import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initUserCards} from '../features/user_cards/userCardsSlice';
import {initRoundCards, addCardToRound} from '../features/round_cards/roundCardsSlice';
import {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk
} from "../features/game_details/gameDetailsSlice";

import {Table} from './PlayRoom.style';

import {findHigherCard, addCardsTo} from '../utils'
import CardGroup from '../card_group';

import {suits, data} from "../data";
import {
    USER_LOST_ROUND,
    COMPUTER_LOST_ROUND,
    MOVE_ROUND_TO_TRASH,
    MESSAGE,
} from '../constants'

import {UserCards} from "../features/user_cards/UserCards";
import {RoundCards} from "../features/round_cards/RoundCards";
import {ComputerCards} from "../features/computer_cards/ComputerCards";
import {initComputerCards} from "../features/computer_cards/computerCardsSlice";

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
const sortCallback = (f, s) => f.level - s.level;
const getRandomInt = max => Math.floor(Math.random() * max);

function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}


function findHigherTrumpCard(cards, cardToCover, trump) {
    return cards
        ?.filter(card => card.suit === trump && !card.hide)
        ?.sort(sortCallback)
        ?.find(
            card =>
                (card.suit !== cardToCover.suit) ||
                (card.suit === cardToCover.suit && card.level > cardToCover.level)
        );
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

    useEffect(() => {
        const timer = window.setInterval(() => {
            console.log('Opppa', isComputerAttack, isComputerWalk);

            //Computer will attack
            if (isComputerWalk) {
                if (isComputerAttack) {
                    console.log('Computer attack')
                    const cardToSend = computerCards[0];
                    manageCard(cardToSend)
                }

                //Computer will defence
                if (!isComputerAttack) {
                    console.log('Computer defence')
                    const cardToSend = computerCards[0];
                    manageCard(cardToSend)

                }
            }

        }, 2000);

        return () => window.clearInterval(timer);
    }, [])

    function manageCard(cardToMove) {
        const filtered = computerCards.filter(card => card !== cardToMove)

        dispatch(initComputerCards(filtered))
        dispatch(addCardToRound(cardToMove))
        dispatch(changeTurnWalk())
    }


    function disableCardsHide(cards) {
        return cards.map(c => ({...c, hide: false}))
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

    return (
        <Table>
            {showMenu && <button onClick={startGame}>Start Game</button>}
            <ComputerCards/>
            <CardGroup ownerName='Coloda' cards={coloda}/>
            <CardGroup ownerName='Trush' cards={trash}/>
            <div>Trump: {trump}</div>
            <RoundCards/>
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
