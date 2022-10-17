import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initUserCards} from '../features/user_cards/userCardsSlice';
import {addCardToRound} from '../features/round_cards/roundCardsSlice';
import {
    setUserTurnWalk,
    setUserTurnAttack,
    setComputerTurnAttack,
    setComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk} from "../features/game_details/gameDetailsSlice";

import CardGroup from '../card_group';

import {suits, data} from "../data";
import {
    USER_LOST_ROUND,
    COMPUTER_LOST_ROUND,
    MOVE_ROUND_TO_TRASH,
    TURN,
    MESSAGE,
    maxRoundCards,
    maxUserCardsPerRound
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

let trump = getTrump();
let coloda = initCards();
let trash = []

function App() {
    const turnAttack = useSelector(state => state.gameDetails.turnAttack);
    const turnWalk = useSelector(state => state.gameDetails.turnWalk);
    const computerCards = useSelector(state => state.computerCards.value);
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(true);
    const [message, setMessage] = useState()

    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);

        // Set which turn to attack
        if (getRandomInt(2) === 0) {
            dispatch(setComputerTurnAttack());
            dispatch(setComputerTurnWalk());
        } else {
            dispatch(setUserTurnAttack);
            dispatch(setUserTurnWalk);

        }

        endRound()
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

    function sendCard(cardToCover) {
        return () => {

            if (cardToCover.hide) return;

            // Show warning if user want to add wrong card
            // if (roundCards.length > 0 && !canCardBeAdded(roundCards, cardToCover) && TURN.COMPUTER.ATTACK !== turnAttack) {
            //     userCards = userCards.map(card => card === cardToCover ? {...card, warning: true} : card)
            //
            //     return turnOffWarningFrom(userCards, cards => userCards = cards);
            // }

            //.hide mean it was used before
            cardToCover.hide = true;

            switch (turnAttack) {
                case TURN.USER.ATTACK:
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
                case TURN.COMPUTER.ATTACK:
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
        dispatch(initUserCards(leftUserCards))
        dispatch(initComputerCards(leftComputerCards));
        roundCards = [];

        if (COMPUTER_LOST_ROUND !== status) {
            if (TURN.COMPUTER.ATTACK !== turnAttack) {
                const firstCard = leftComputerCards[0];
                const filteredComputerCards = leftComputerCards.filter(card => card !== firstCard);

                dispatch(initComputerCards(filteredComputerCards));
                dispatch(addCardToRound(firstCard))
            }

            dispatch(changeTurnWalk());
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
            {showMenu && <button onClick={startGame}>Start Game</button>}
            <ComputerCards/>
            {/*<CardGroup cards={computerCards}/>*/}
            <CardGroup cards={coloda}/>
            <CardGroup cards={trash}/>
            {trump}
            <RoundCards/>
            {/*<Table cards={roundCards} handlePass={passRound}/>*/}
            {turnAttack}
            {turnWalk}
            <UserCards/>
            {/*<CardGroup cards={userCards} handleClick={sendCard}/>*/}
            <div>{message}</div>
        </div>
    );
}

export default App;
