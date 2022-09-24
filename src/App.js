import {useState} from "react";

import './App.css';

import Table from "./table";
import CardGroup from './card_group';

const cards = [
    {level: 6, title: 6},
    {level: 7, title: 7},
    {level: 8, title: 8},
    {level: 9, title: 9},
    {level: 10, title: 10},
    {level: 11, title: 'V'},
    {level: 12, title: 'D'},
    {level: 13, title: 'K'},
    {level: 14, title: 'T'},
];

const suits = [
    {color: 'red', suit: '♥'},
    {color: 'red', suit: '♦'},
    {color: 'black', suit: '♣'},
    {color: 'black', suit: '♠'},
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

const maxCardsAmountPerGame = 6;

function App() {
    const [coloda, setColoda] = useState(initCards);
    const [roundCards, setRoundCards] = useState([]);
    const [computerCards, setComputerCards] = useState([])
    const [userCards, setUserCards] = useState([])
    const [showStartGameButton, setShowStartGameButton] = useState(true);
    const [message, setMessage] = useState("Ops. I can't bit it.")

    function startGame() {
        givePlayersCards([setComputerCards, setUserCards])
        setShowStartGameButton(false);
    }

    function sendCard(cardToCover) {
        return () => {
            setUserCards(userCards.filter(pc => pc !== cardToCover))
            findCoverCardForComputer(cardToCover)
        }
    }

    function findCoverCardForComputer(cardToCover) {
        const sortedComputerCards = computerCards.sort((f, s) => f.level - s.level)
        let foundHigherCard = sortedComputerCards.find(card => card.level > cardToCover.level && card.suit === cardToCover.suit);

        if (!foundHigherCard) {
            setComputerCards([...computerCards, cardToCover, ...roundCards]);
            setRoundCards([])

            return;
        }

        setComputerCards(sortedComputerCards.filter(card => card !== foundHigherCard));
        setRoundCards([...roundCards, cardToCover, foundHigherCard]);
    }

    function givePlayersCards() {
        let players = [
            {cards: computerCards, setCards: setComputerCards},
            {cards: userCards, setCards: setUserCards},
        ];


        let _coloda = coloda;
        let playerCards = []

        players.forEach(player => {
            let curdsAmount = maxCardsAmountPerGame - player.cards.length ;

            if (curdsAmount > 0) {
                // Copy cards from the end of cards arrays.
                player.setCards(_coloda.slice(-curdsAmount));
                // Copy cards from start. We took cards, we update coloda to avoid duplication.
                _coloda = _coloda.slice(0, _coloda.length - curdsAmount);
            }
        })

        // Update coloda array after we gave cards for players.
        setColoda(_coloda);
    }

    return (
        <div className="App">
            {showStartGameButton && <button onClick={startGame}>Start Game</button>}
            <CardGroup cards={computerCards}/>
            <Table cards={roundCards}/>
            <CardGroup cards={userCards} handleClick={sendCard}/>
            <div>{message}</div>
        </div>
    );
}

export default App;
