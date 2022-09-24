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

function cutCards(coloda, playters, setCutedColoda, curdsAmount) {
    let cutedColoda = coloda;
    let playerCards = []

    playters.forEach(set => {
        set(cutedColoda.slice(-curdsAmount))
        cutedColoda = cutedColoda.slice(0, cutedColoda.length - curdsAmount);
        }
    )

    setCutedColoda(cutedColoda);
    playerCards.forEach((e, i) => playters[i](e))
}

function findCoverCardForComputer(cardToCover, computerCards, setComputerCards, roundCards, setRoundCards) {
    const sortedComputerCards = computerCards.sort((f,s) => f.level - s.level)
    let foundHigherCard = sortedComputerCards.find(card => card.level > cardToCover.level && card.suit === cardToCover.suit);

    if (!foundHigherCard) {
        setComputerCards([...computerCards, cardToCover, ...roundCards]);
        setRoundCards([])
        return;
    }

    setComputerCards(sortedComputerCards.filter(card => card !== foundHigherCard));
    setRoundCards([...roundCards, cardToCover, foundHigherCard]);

    console.log(cardToCover, foundHigherCard);
    console.log(computerCards)
}

function App() {
    const [coloda, setColoda] = useState(initCards);
    const [roundCards, setRoundCards] = useState([]);
    const [computerCards, setComputerCards] = useState([])
    const [userCards, setUserCards] = useState([])
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    function startGame() {
        cutCards(coloda, [setComputerCards, setUserCards], setColoda, 6)
        setShowStartGameButton(false);
    }

    function sendCard(cardToCover) {
        return () => {
            setUserCards(userCards.filter(pc => pc !== cardToCover))
            findCoverCardForComputer(cardToCover, computerCards, setComputerCards, roundCards, setRoundCards)
        }
    }

    return (
        <div className="App">
            {showStartGameButton && <button onClick={startGame}>Start Game</button>}
            <CardGroup cards={computerCards} />
            <Table cards={roundCards} />
            <CardGroup cards={userCards} handleClick={sendCard} />
        </div>
    );
}

export default App;
