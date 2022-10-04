import { useEffect, useState } from 'react';

import './App.css';
import {Footer} from "./App.style";

import Table from "./table";
import CardGroup from './card_group';

import {suits, data} from "./data";
import {
    USER_LOST_ROUND,
    COMPUTER_LOST_ROUND,
    MOVE_ROUND_TO_TRASH,
    USER_TURN_ATTACK,
    COMPUTER_TURN_ATTACK,
    MESSAGE,
    maxRoundCards,
    maxUserCardsPerRound
} from './constants'

const log = console.log;

function initCards() {
    const result = [];

    data.forEach(card =>
        suits.forEach(suit =>
            result.push({...card, ...suit, status: 'coloda'})
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
const canCardBeAdded = (cards, candidateToAdd) => cards.find(card => card.level === candidateToAdd.level)

function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}

function findHigherCard(cards, cardToCover) {
    return cards.find(card =>
        card.suit === cardToCover.suit &&
        card.level > cardToCover.level &&
        !card.hide
    );
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
let computerCards = []

let trump = getTrump();
let coloda = initCards();
let turnAttack = getRandomInt(2) === 0 ? USER_TURN_ATTACK : COMPUTER_TURN_ATTACK;
let trash = []

function App() {

    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [message, setMessage] = useState()

    useEffect(() => {
        setInterval(() => {

            setShow( new Date().getMilliseconds())
        }, 1000)
    }, [])


    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);
        endRound()
    }

    function disableCardsHide(cards) {
        return cards.map(c => ({...c, hide: false}))
    }

    function changeTurnAttack() {
        log('changeTurn')
        turnAttack = USER_TURN_ATTACK === turnAttack
            ? COMPUTER_TURN_ATTACK
            : USER_TURN_ATTACK
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

    function endRound(status) {

        let leftUserCards = [];
        let leftRoundCards = [];
        let leftComputerCards = [];

        //Split used data
        userCards.forEach(c => c.hide ? leftRoundCards.push(c) : leftUserCards.push(c));
        computerCards.forEach(c => c.hide ? leftRoundCards.push(c) : leftComputerCards.push(c));

        log('length', leftRoundCards.length, leftComputerCards.length, leftUserCards.length)

        switch (status) {
            case COMPUTER_LOST_ROUND:
                leftComputerCards = [...leftComputerCards, ...leftRoundCards];
                break;
            case USER_LOST_ROUND:
                leftUserCards = [...leftUserCards, ...leftRoundCards];
                break;
            case MOVE_ROUND_TO_TRASH:
                trash = [...trash, ...leftRoundCards];
                break;
        }

        let players = [
            {cards: leftUserCards, set: cards => leftUserCards = cards},
            {cards: leftComputerCards, set: cards => leftComputerCards = cards},
        ];

        let _coloda = coloda;

        if (coloda.length > 0) {
            players.forEach(player => {

                // Find data amount which we can add after round
                let cardsCanBeAdded = maxUserCardsPerRound - player.cards.length;

                if (cardsCanBeAdded > 0 && _coloda.length > 0) {
                    // Move data from coloda to player
                    let updatedCards = [...player.cards, ..._coloda.slice(-cardsCanBeAdded)]
                    //If user lost round we need to update hide param to let it use later.
                    updatedCards.forEach(card => card.hide = false);
                    player.set(updatedCards);

                    if (cardsCanBeAdded > _coloda.length) {
                        _coloda = [];
                    } else {
                        // Copy data from start. We took data for user, we update coloda. The way to avoid duplication.
                        _coloda = _coloda.slice(0, _coloda.length - cardsCanBeAdded);
                    }
                }
            })
        }

        leftUserCards = sort(leftUserCards)
        leftComputerCards = sort(leftComputerCards)

        // Update coloda array after we gave data for players.
        coloda = _coloda;
        userCards = leftUserCards
        computerCards = leftComputerCards
        roundCards = [];

        if (COMPUTER_LOST_ROUND !== status) {
            if (COMPUTER_TURN_ATTACK !== turnAttack) {
                const firstCard = leftComputerCards[0];

                firstCard.hide = true;
                roundCards = [firstCard]
            }

            changeTurnAttack();
        }
    }


    function passRound() {
        if (roundCards.length % 2 === 0 && roundCards.length >= 2) {
            endRound(MOVE_ROUND_TO_TRASH);
        } else {
            log('oops')
        }
    }


    return (
        <div className="App">
            {show + '' }
            {showMenu && <button onClick={startGame}>Start Game</button>}
            <CardGroup cards={computerCards}/>
            <CardGroup cards={coloda}/>
            <CardGroup cards={trash}/>
            {trump}
            <Table cards={roundCards} handlePass={passRound}/>
            {turnAttack}
            <Footer>
                <CardGroup cards={userCards} handleClick={sendCard}/>
            </Footer>
            <div>{message}</div>
        </div>
    );
}

export default App;
