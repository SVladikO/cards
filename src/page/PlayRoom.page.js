import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Wrapper, Table, Trump} from './PlayRoom.style';

import {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk,
    setTrump,
} from "../redux/gameDetailsSlice";
import {useInterval} from '../hooks'

import {findHigherCard, prepareCardsTo, canCardBeAddedToRound, getLastRoundCard} from '../utils'

import {suits, data} from "../data";
import {SituationTypes} from '../constants'
import {StoreNames} from "../redux/type";
import {Action} from '../redux/common_card_slice';
import Round from "../components/round/Round";
import CardGroup from '../components/card_group';

import {UserCards} from "../features/user_cards/UserCards";
import {ComputerCards} from "../features/computer_cards/ComputerCards";

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

const generateTrump = () => suits.map(s => s.suit)[getRandomInt(4)];
const getRandomInt = max => Math.floor(Math.random() * max);

function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}

const getSuit = card => card.title + card.suit;

function App() {
    const trump = useSelector(state => state.gameDetails.trump);
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

    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);

        // Set which turn to attack
        const isComputerTurn = getRandomInt(2) === 0;
        dispatch(setIsComputerTurnAttack(true)) //isComputerTurn));
        dispatch(setIsComputerTurnWalk(true)) //isComputerTurn));
        dispatch(setTrump(generateTrump())) //isComputerTurn));

        //Init cards.
        addCardsToPlayers(SituationTypes.START_GAME)
    }

    useEffect(() => {
        dispatch(Action.Coloda.init(initCards()))
    }, [])

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
        if (!isComputerAttack) {
            console.log('yOU CAN"T TAKE CARDS WHEN YOU ATTACK')
            return;
        }
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
        const cardToCover = getLastRoundCard(roundCards);
        const higherCard = findHigherCard(computerCards, cardToCover, trump)

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

    }, 4000)

    const attackMessage = isComputerAttack ? "Computer" : 'User';
    const walkMessage = isComputerWalk ? "Computer" : 'User';
    return (
        <Wrapper>
            <CardGroup ownerName='Trush' cards={trash}/>
            <Table>
                {showMenu && <button onClick={startGame}>Start Game</button>}
                <ComputerCards/>

                <Round
                    cards={roundCards}
                    handlePass={passRound}
                    handleTake={takeCards}
                    attackMessage={attackMessage}
                    walkMessage={walkMessage}
                />

                <Trump>Trump: {trump}</Trump>
                <UserCards />
                <div>{message}</div>
            </Table>
            <CardGroup ownerName='Coloda' cards={coloda}/>

        </Wrapper>
    );
}

export default App;

