import {useState} from "react";

import './App.css';
import {Footer} from "./App.style";

import Table from "./table";
import CardGroup from './card_group';

const log = console.log;

let raund = 1;
let history = [];

const cards = [
    {level: 1, title: 1},
    {level: 2, title: 2},
    {level: 3, title: 3},
    {level: 4, title: 4},
    {level: 5, title: 5},
    {level: 6, title: 6},
    {level: 7, title: 7},
    {level: 8, title: 8},
    {level: 9, title: 9},
    {level: 10, title: 10},
    {level: 11, title: 11},
    {level: 12, title: 12},
    {level: 13, title: 13},
    {level: 14, title: 14},
    {level: 15, title: 15},
    {level: 16, title: 16},
    {level: 17, title: 17},
    {level: 18, title: 18},
    {level: 19, title: 19},
    {level: 20, title: 20},
    {level: 21, title: 21},
    {level: 22, title: 22},
    {level: 23, title: 23},
    {level: 24, title: 24},
    {level: 25, title: 25},
    {level: 26, title: 26},
    {level: 27, title: 27},
    {level: 28, title: 28},
    {level: 29, title: 29},
    {level: 30, title: 30},
    {level: 31, title: 31},
    {level: 32, title: 32},
    {level: 33, title: 33},
    {level: 34, title: 34},
    {level: 35, title: 35},
    {level: 36, title: 36},
    // {level: 11, title: 'V'},
    // {level: 12, title: 'D'},
    // {level: 13, title: 'K'},
    // {level: 14, title: 'T'},
];

const suits = [
    {color: 'red', suit: '♥'},
    // {color: 'red', suit: '♦'},
    // {color: 'black', suit: '♣'},
    // {color: 'black', suit: '♠'},
];

// ♥/♡	♦/♢	♠/♤	♣/♧
function initCards() {
    const result = [];

    cards.forEach(card =>
        suits.forEach(suit =>
            result.push({...card, ...suit})
        )
    )

    // Mix cards array
    result.sort(() => Math.random() - 0.5);
    return result;
}

function sort(cards) {
    return cards.sort((f, s) => f.level - s.level)
}

function toString(array) {
    let str = '';
    array.forEach(card => str += getSuit(card))

    return str;
}

function logToString(array, tt) {
    log(array.length, toString(array), tt);
}

function showStory() {
    console.clear()
    log('history.length: ', history.length);
    history.forEach(step => log(step));

    log('|')
    log('|')
    log('|')
    log('|')
}

const getSuit = card => card.title + card.suit;

const maxCardsAmountPerGame = 6;

function App() {
    const [coloda, setColoda] = useState(initCards);
    const [roundCards, setRoundCards] = useState([]);
    const [computerCards, setComputerCards] = useState([])
    const [userCards, setUserCards] = useState([])
    const [showStartGameButton, setShowStartGameButton] = useState(true);
    const [message, setMessage] = useState("Ops. I can't bit it.")
    const [showMessage, setShowMessage] = useState(false)

    function _setComputerCards(cards, title) {
        setComputerCards(cards)
        log('^^^: ', title, 'before: ', toString(computerCards), 'after: ', toString(cards),)
    }


    function deleteCardFromUser(card) {
        const filtered = userCards.filter(c => getSuit(c) !== getSuit(card))
        log('Filtered users: ', toString(filtered), 'after delete: ', toString([card]))
        setUserCards(filtered)
    }

    function deleteCardFromComputer(card) {
        _setComputerCards(computerCards.filter(c => getSuit(c) !== getSuit(card)), 'deleteCardFromComputer')
    }

    function startGame() {
        givePlayersCards()
        setShowStartGameButton(false);
    }

    function sendCard(cardToCover) {
        return () => {
            log('!!!!!!!!!!!!!!!!!!!!!!              !!!!!!!!!!!!!!!!!!!!!!!!!!')
            logToString(userCards, ':: before userCards')
            logToString(computerCards, ':: before computerCards')

            // Delete clicked card from user cards
            const sortedComputerCards = sort(computerCards);
            let higherCard = sortedComputerCards.find(card => card.suit === cardToCover.suit && card.level > cardToCover.level);


            log(higherCard ? getSuit(higherCard) : '?', !!higherCard ? '>' : '<', getSuit(cardToCover))

            history.push(getSuit(cardToCover) + ' < ' +  (higherCard ? getSuit(higherCard) : '?'));

            showStory()
            // If higherCard doesn't exist
            if (!higherCard) {
                //We sort cards be update computer cards to simplify later find correct card to cover
                _setComputerCards([...computerCards, ...roundCards, cardToCover], 'higherCard doesn"t exist');
                deleteCardFromUser(cardToCover);
                setRoundCards([])
                history.push('round: ' + ++raund)
                setTimeout(() => {
                    log('givePlayersCards')
                    givePlayersCards();
                }, 1000);

                return;
            }

            setRoundCards([...roundCards, cardToCover, higherCard]);
            deleteCardFromComputer(higherCard);

            const filteredUsers = userCards.filter(card => getSuit(card) !== getSuit(cardToCover))
            setUserCards(filteredUsers)


            logToString(userCards, ':: after userCards')
            logToString(computerCards, ':: after computerCards')
        }
    }

    function givePlayersCards() {
        let players = [];

        if (computerCards.length < maxCardsAmountPerGame) {
            players.push({
                cards: computerCards,
                setCards: cards => _setComputerCards(cards, 'givePlayersCards'),
                title: 'computer'
            })
        }

        if (userCards.length < maxCardsAmountPerGame) {
            players.push({cards: userCards, setCards: setUserCards, title: 'user'})
        }

        console.log("givePlayersCards for ", players.length)

        let _coloda = coloda;

        players.forEach(player => {
            // Find cards amount which we should add after round
            let cardsShouldBeAdded = maxCardsAmountPerGame - player.cards.length;
            logToString(player.cards, `?? ${player.title}`)

            if (cardsShouldBeAdded > 0) {
                // Copy cards from the end of coloda arrays.
                player.setCards([...player.cards, ..._coloda.slice(-cardsShouldBeAdded)]);
                // Copy cards from start. We took cards for user, we update coloda. The way to avoid duplication.
                _coloda = _coloda.slice(0, _coloda.length - cardsShouldBeAdded);
            }
        })

        // Update coloda array after we gave cards for players.
        setColoda(_coloda);
    }

    return (
        <div className="App">
            {showStartGameButton && <button onClick={startGame}>Start Game</button>}
            <CardGroup cards={computerCards}/>
            <CardGroup cards={coloda}/>
            <Table cards={roundCards}/>
            <Footer>
                <CardGroup cards={userCards} handleClick={sendCard}/>
            </Footer>
            {showMessage && <div>{message}</div>}
        </div>
    );
}

export default App;
