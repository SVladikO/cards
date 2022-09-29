import {useState} from "react";

import './App.css';
import {Footer} from "./App.style";

import Table from "./table";
import CardGroup from './card_group';

import {suits, cards} from "./cards";
import {
    USER_LOST_ROUND,
    COMPUTER_LOST_ROUND,
    MOVE_ROUND_TO_TRASH,
    USER_TURN_ATTACK,
    COMPUTER_TURN_ATTACK
} from './constants'

const log = console.log;

function initCards() {
    const result = [];

    cards.forEach(card =>
        suits.forEach(suit =>
            result.push({...card, ...suit, status: 'coloda'})
        )
    )

    // Mix cards array
    result.sort(() => Math.random() - 0.5);
    return result;
}

let st = true;

function getTrump() {
    return suits.map(s => s.suit)[getRandomInt(4)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const sortCallback = (f, s) => f.level - s.level;

function sort(cards) {
    return cards.sort((f, s) => f.level - s.level)
}

function canCardBeAdded(cards, candidateToAdd) {
    return cards.find(card => card.level === candidateToAdd.level)
}

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

const MESSAGE = {
    USER_WON: 'User won.',
    COMPUTER_WON: 'Computer won!',
    DRAW: 'Draw.',
    CANT_BET_YOU: "Ops. I can't bit it.",
}

const getSuit = card => card.title + card.suit;

const maxRoundCards = 12;
const maxUserCardsPerRound = 6;

function App() {

    const [roundCards, setRoundCards] = useState([]);
    const [computerCards, setComputerCards] = useState([])
    const [userCards, setUserCards] = useState([])

    const [trump, setTrump] = useState('');
    const [coloda, setColoda] = useState(initCards);

    const [turnAttack, setTurnAttack] = useState(getRandomInt(2) === 0 ? USER_TURN_ATTACK : COMPUTER_TURN_ATTACK);
    const [trash, setTrash] = useState([]);
    const [showMenu, setShowMenu] = useState(true);
    const [message, setMessage] = useState()

    function deleteCardFromUser(card) {
        const filtered = userCards.filter(c => getSuit(c) !== getSuit(card))
        setUserCards(filtered)
    }

    function deleteCardFromComputer(card) {
        setComputerCards(computerCards.filter(c => getSuit(c) !== getSuit(card)))
    }

    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setTrump(getTrump())
        setShowMenu(false);
        endRound()
    }

    function changeTurnAttack() {
        log('changeTurn')
        setTurnAttack(USER_TURN_ATTACK === turnAttack
            ? COMPUTER_TURN_ATTACK
            : USER_TURN_ATTACK
        )
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
            // Show warning if user want to add wrong card
            if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover)) {
                setUserCards(userCards.map(card => card === cardToCover ? {...card, warning: true} : card))
                return turnOffWarningFrom(userCards, setUserCards);
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
                        setRoundCards([...roundCards, cardToCover]);
                        return endRound(COMPUTER_LOST_ROUND);
                    }

                    computerHigherCard.hide = true;
                    setRoundCards([...roundCards, cardToCover, computerHigherCard]);

                    break;
                case COMPUTER_TURN_ATTACK:
                    let userHigherCard = findHigherCard(userCards, cardToCover)
                    //Beat by trump
                    userHigherCard = userHigherCard || findHigherTrumpCard(userCards, cardToCover, trump)
                    setRoundCards([...roundCards, cardToCover, userHigherCard]);

                    break;
            }

            showEndGameMessage()
        }
    }


    function endRound(status) {

        let leftUserCards = [];
        let leftRoundCards = [];
        let leftComputerCards = [];

        //Split used cards
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
                setTrash([...trash, ...leftRoundCards])
                break;
        }

        let players = [
            {cards: leftUserCards, set: cards => leftUserCards = cards},
            {cards: leftComputerCards, set: cards => leftComputerCards = cards},
        ];

        let _coloda = coloda;

        if (coloda.length > 0) {
            players.forEach(player => {

                // Find cards amount which we can add after round
                let cardsCanBeAdded = maxUserCardsPerRound - player.cards.length;

                if (cardsCanBeAdded > 0 && _coloda.length > 0) {
                    // Move cards from coloda to player
                    let updatedCards = [...player.cards, ..._coloda.slice(-cardsCanBeAdded)]
                    //If user lost round we need to update hide param to let it use later.
                    updatedCards.forEach(card => card.hide = false);
                    player.set(updatedCards);

                    if (cardsCanBeAdded > _coloda.length) {
                        _coloda = [];
                    } else {
                        // Copy cards from start. We took cards for user, we update coloda. The way to avoid duplication.
                        _coloda = _coloda.slice(0, _coloda.length - cardsCanBeAdded);
                    }
                }
            })
        }

        leftUserCards = sort(leftUserCards)
        leftComputerCards = sort(leftComputerCards)

        // Update coloda array after we gave cards for players.
        setColoda(_coloda);
        setUserCards(leftUserCards)
        setComputerCards(leftComputerCards)
        setRoundCards([]);

        setInterval(() => {

            log({st}, COMPUTER_TURN_ATTACK, turnAttack, roundCards.length, computerCards)
            st = !st;
            if (COMPUTER_TURN_ATTACK !== turnAttack) return;

            if (roundCards.length === 0) {
                const firstCard = computerCards[0];
                firstCard.hide = true;
                setRoundCards([firstCard])
            }
        }, 2000)

        changeTurnAttack();

    }


    function passRound() {
        endRound(MOVE_ROUND_TO_TRASH);
    }

    return (
        <div className="App">
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
