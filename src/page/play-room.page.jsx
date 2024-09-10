import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Wrapper, Table, CardGroupsOwnerTitle} from './play-room.style';

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
import Round from "../components/round/round";
import CardGroup from '../components/card-group/card-group';

import {UserCards} from "../features/user-cards/user-cards";
import {ComputerCards} from "../features/computer-cards/computer-cards";

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

const sortTrumpToEnd = (cards, trump) => {
    const trumps = cards.filter(card => card.suit === trump)
    const simpleCards = cards.filter(card => card.suit !== trump)
    console.log(trumps.map(t => t.suit))
    console.log(simpleCards.map(t => t.suit))

    return [sort(simpleCards), sort(trumps)];
}
const getRandomInt = max => Math.floor(Math.random() * max);

function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}

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

    function startGame() {
        // TODO: ADD SPINNER FOR TURN
        setShowMenu(false);

        // Set which turn to attack
        const isComputerTurn = getRandomInt(2) === 0;
        dispatch(setIsComputerTurnAttack(true)) //isComputerTurn));
        dispatch(setIsComputerTurnWalk(true)) //isComputerTurn));
        dispatch(setTrump(getFirsColodaCard().suit)) //isComputerTurn));

        //Init cards.
        addCardsToPlayers(SituationTypes.START_GAME)
    }

    const getFirsColodaCard = () => coloda.length && coloda[0];

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

        const [usualCards, trumpCards] = sortTrumpToEnd(computerCards, trump)

        // Start of attack
        if (!roundCards.length) {
            return manageCard(usualCards[0] || trumpCards[0]);
        }

        let cardCandidate = usualCards.find(card => canCardBeAddedToRound(roundCards, card))

        if (!cardCandidate && (coloda.length < 4 || roundCards.length > 8)) {
            cardCandidate = trumpCards.find(card => canCardBeAddedToRound(roundCards, card))
        }

        console.log('COMPUTER ATTACK. candidate', cardCandidate)
        // If nothing to add computer will pass round
        if (!cardCandidate || (cardCandidate.level > 10 && coloda.length < 10)) {
            return passRound()
        }

        manageCard(cardCandidate)
    }

    function computerDefence() {
        const cardToCover = getLastRoundCard(roundCards);

        const [usualCards, trumpCards] = sortTrumpToEnd(computerCards, trump)

        let higherCard = findHigherCard(usualCards, cardToCover, trump);

        if (!higherCard) {
            higherCard = findHigherCard(trumpCards, cardToCover, trump);
        }

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
        <>
            <Wrapper className="play-room-page">
                <Table className="table">
                    {showMenu && <button onClick={startGame}>Start Game</button>}
                    {!showMenu && <CardGroupsOwnerTitle>Computer cards</CardGroupsOwnerTitle>}
                    <ComputerCards/>

                    <Round
                        cards={roundCards}
                        handlePass={passRound}
                        handleTake={takeCards}
                        attackMessage={attackMessage}
                        walkMessage={walkMessage}
                        isComputerAttack={isComputerAttack}
                        trumpCard={getFirsColodaCard()}
                        showMenu={showMenu}
                    />
                    {!showMenu && <ShowMessage isComputerAttack={isComputerAttack} isComputerWalk={isComputerWalk}/>}
                    <UserCards/>
                    {!showMenu && (
                        <div>
                            {
                                !isComputerAttack &&
                                !!roundCards.length &&
                                roundCards.length % 2 === 0 && //computer should cover card before we let it go to trash
                                <button onClick={passRound}>Відбій</button>
                            }

                            {isComputerAttack && !!roundCards.length && <button onClick={takeCards}>Зняти</button>}
                        </div>
                    )}
                </Table>

                <div>
                    <div>Attack {attackMessage}/ Walk {walkMessage}</div>
                    <div>ComputerCards: {computerCards.length}</div>
                    <div>UserCards: {userCards.length}</div>
                    <div>RoundCards: {roundCards.length}</div>
                    <div>TrashCards: {trash.length}</div>
                    <div>ColodaCards: {coloda.length}</div>
                    <div>Trash</div>
                    <CardGroup ownerName='Trush' cards={trash}/>
                    <div>Coloda</div>
                    <CardGroup ownerName='Coloda' cards={coloda}/>
                </div>
            </Wrapper>

        </>
    );
}

function ShowMessage({isComputerAttack, isComputerWalk}) {

    return (
        <div style={{height: '20px'}}>
            <div>
                {isComputerAttack && !isComputerWalk && 'Бийся'}
            </div>
            <div>
                {!isComputerAttack && !isComputerWalk && 'Ходи'}
            </div>
            <div>
                {isComputerAttack && isComputerWalk && 'Чекай'}
            </div>
        </div>
    )
}

export default App;

