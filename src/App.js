import {useState} from "react";

import './App.css';
import {Footer} from "./App.style";

import Table from "./table";
import CardGroup from './card_group';

const log = console.log;

const cards = [
    // {level: 1, title: 1},
    // {level: 2, title: 2},
    // {level: 3, title: 3},
    // {level: 4, title: 4},
    // {level: 5, title: 5},
    {level: 6, title: 6},
    {level: 7, title: 7},
    {level: 8, title: 8},
    {level: 9, title: 9},
    {level: 10, title: 10},
    // {level: 11, title: 11},
    // {level: 12, title: 12},
    // {level: 13, title: 13},
    // {level: 14, title: 14},
    // {level: 15, title: 15},
    // {level: 16, title: 16},
    // {level: 17, title: 17},
    // {level: 18, title: 18},
    // {level: 19, title: 19},
    // {level: 20, title: 20},
    // {level: 21, title: 21},
    // {level: 22, title: 22},
    // {level: 23, title: 23},
    // {level: 24, title: 24},
    // {level: 25, title: 25},
    // {level: 26, title: 26},
    // {level: 27, title: 27},
    // {level: 28, title: 28},
    // {level: 29, title: 29},
    // {level: 30, title: 30},
    // {level: 31, title: 31},
    // {level: 32, title: 32},
    // {level: 33, title: 33},
    // {level: 34, title: 34},
    // {level: 35, title: 35},
    // {level: 36, title: 36},
    {level: 11, title: 'V'},
    {level: 12, title: 'D'},
    {level: 13, title: 'K'},
    {level: 14, title: 'T'},
];

const USER_TAKE = 'USER_TAKE';
const COMPUTER_TAKE = 'COMPUTER_TAKE';
const MOVE_ROUND_TO_TRASH = 'MOVE_ROUND_TO_TRASH';

const suits = [
    {color: 'red', suit: '♥'},
    {color: 'red', suit: '♦'},
    {color: 'black', suit: '♣'},
    {color: 'black', suit: '♠'},
];

const CARD_STATYS = {
    COLODA: 'COLODA',
    USER: 'USER',
    COMPUTER: 'COMPUTER',
    BIN: 'BIN',
    ROUND: 'ROUND'
}

const TURN = {
    USER: 'USER',
    COMPUTER: 'COMPUTER'
}

// ♥/♡	♦/♢	♠/♤	♣/♧
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

function getCozur() {
    return ['♥', '♦', '♣', '♠'][getRandomInt(4)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

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

const MESSAGE = {
    USER_WON: 'User won.',
    COMPUTER_WON: 'Computer won!',
    DRAW: 'Draw.',
    CANT_BET_YOU: "Ops. I can't bit it.",
}

const getSuit = card => card.title + card.suit;

const maxCardsAmountPerRound = 6;

function App() {
    const [cozur, setCozur] = useState('');
    const [coloda, setColoda] = useState(initCards);
    const [turn, setTurn] = useState('');
    const [roundCards, setRoundCards] = useState([]);
    const [trash, setTrash] = useState([]);
    const [computerCards, setComputerCards] = useState([])
    const [userCards, setUserCards] = useState([])
    const [showStartGameButton, setShowStartGameButton] = useState(true);
    const [message, setMessage] = useState()
    const [showMessage, setShowMessage] = useState(false)

    function deleteCardFromUser(card) {
        const filtered = userCards.filter(c => getSuit(c) !== getSuit(card))
        setUserCards(filtered)
    }

    function deleteCardFromComputer(card) {
        setComputerCards(computerCards.filter(c => getSuit(c) !== getSuit(card)))
    }

    function startGame() {
        giveCardsAfterRound()
        setCozur(getCozur())
        setShowStartGameButton(false);
    }

    const card = {
        addTo: {
            computer: {},
            user: {}
        },
        send: {
            on: {
                table: {
                    computer: {
                        SIMPLE_COMPUTER: () => {
                        },
                        HARD_COMPUTER: () => {
                        },
                    },
                    user: {}
                }
            }
        },
        bit: {
            computer: {
                SIMPLE_COMPUTER: () => {
                },
                HARD_COMPUTER: () => {
                },
            }
        }
    }

    function sendCard(cardToCover) {
        return () => {

            if (roundCards.length === 0) {
                cardToCover.hide = true;
            }

            // Show warning if user want to add wrong card
            if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover)) {
                setUserCards(userCards.map(card => card === cardToCover ? {...card, warning: true} : card))
                return turnOffWarningFrom(userCards, setUserCards);
            }

            let higherCard = computerCards.find(card =>
                card.suit === cardToCover.suit &&
                card.level > cardToCover.level &&
                !card.hide
            );

            // If higherCard doesn't exist
            if (!higherCard) {
                return giveCardsAfterRound(COMPUTER_TAKE);
            }

            higherCard.hide = true;
            setRoundCards([...roundCards, cardToCover, higherCard]);


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
    }


    function giveCardsAfterRound(status) {
        let leftRoundCards = [];
        let leftComputerCards = [];
        let leftUserCards = [];

        computerCards.forEach(card => {
            if (!card.hide) {
                leftComputerCards.push(card)
            } else {
                leftRoundCards.push(card)
            }
        });

        userCards.forEach(card => {
            if (!card.hide) {
                leftUserCards.push(card)
            } else {
                leftRoundCards.push(card)
            }
        });

        log('length', leftRoundCards.length, leftComputerCards.length, leftUserCards.length)

        if (COMPUTER_TAKE === status) {
            leftComputerCards = [...leftComputerCards, ...leftRoundCards].map(card => {
                card.hide = false;
                return card;
            })
        }
        if (USER_TAKE === status) {
            leftUserCards = [...leftUserCards, ...leftRoundCards].map(card => {
                card.hide = false;
                return card;
            })
        }

        let players = [
            {cards: leftUserCards, set: cards => leftUserCards = cards},
            {cards: leftComputerCards, set: cards => leftComputerCards = cards},
        ];

        let _coloda = coloda;

        if (coloda.length > 0) {
            players.forEach(player => {
                // Find cards amount which we can add after round
                let cardsCanBeAdded = maxCardsAmountPerRound - player.cards.length;

                if (cardsCanBeAdded > 0 && _coloda.length > 0) {
                    // Move cards from coloda to player
                    player.set([...player.cards, ..._coloda.slice(-cardsCanBeAdded)]);

                    if (cardsCanBeAdded > _coloda.length) {
                        _coloda = [];
                    } else {
                        // Copy cards from start. We took cards for user, we update coloda. The way to avoid duplication.
                        _coloda = _coloda.slice(0, _coloda.length - cardsCanBeAdded);
                    }
                }
            })
        }

        // Update coloda array after we gave cards for players.
        setColoda(_coloda);
        setUserCards(leftUserCards)
        setComputerCards(sort(leftComputerCards))
        setRoundCards([]);

        if (MOVE_ROUND_TO_TRASH === status) {
            setTrash([...trash, ...leftRoundCards])
        }
    }

    return (
        <div className="App">
            {showStartGameButton && <button onClick={startGame}>Start Game</button>}
            <CardGroup cards={computerCards}/>
            <CardGroup cards={coloda}/>
            <CardGroup cards={trash}/>
            {cozur}
            <Table cards={roundCards} handlePass={() => giveCardsAfterRound(MOVE_ROUND_TO_TRASH)}/>
            <Footer>
                <CardGroup cards={userCards} handleClick={sendCard}/>
            </Footer>
            <div>{message}</div>
        </div>
    );
}

export default App;
