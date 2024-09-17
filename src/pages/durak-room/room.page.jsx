import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Wrapper, Table, TableCenter, TableRight} from './room.style';

import {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk,
    setTrump,
} from "../../redux/gameDetailsSlice";

import {UserCards} from "../../features/user-cards/user-cards";
import ComputerCards from "../../features/computer-cards/computer-cards"

import {StoreNames} from "../../redux/type";
import {Action} from '../../redux/common_card_slice';

import {SituationTypes} from '../../constants'

import Round from "../../components/round/round";
import Trump from "../../components/trump/trump";
import Trash from "../../components/trash/trash"
import DevInfo from "../../components/dev-info/dev-info";
import CardMover from "../../components/card-mover/card-mover";
import WalkMessage from '../../components/walk-message/walk-message'

import {cardGroups} from '../../utils/cards-data';

import {prepareCardsTo, getRandomInt, sortByLevel} from '../../utils/durak-utils';

function App() {
    const computerCards = useSelector(state => state[StoreNames.COMPUTER_CARDS].value);
    const userCards = useSelector(state => state[StoreNames.USER_CARDS].value);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const colodaCards = useSelector((state) => state[StoreNames.COLODA_CARDS].value);
    const trashCards = useSelector((state) => state[StoreNames.TRASH_CARDS].value);
    const dispatch = useDispatch();

    const [cardsMove, setCardsMove] = useState([]);

    useEffect(() => {
        dispatch(Action.Coloda.init(cardGroups[0]))
    }, [])

    useEffect(() => {
        if (colodaCards.length) {
            startGame()
        }
    }, [colodaCards])

    function startGame() {
        // Set which turn to attack
        const isComputerTurn = getRandomInt(2) === 0;
        dispatch(setIsComputerTurnAttack(isComputerTurn));
        dispatch(setIsComputerTurnWalk(isComputerTurn));
        dispatch(setTrump(getFirsColodaCard().suit)) //isComputerTurn));

        //Init cards.
        addCardsToPlayers(SituationTypes.START_GAME)
    }

    const getFirsColodaCard = () => colodaCards.length && colodaCards[0];

    function passRound() {
        if (roundCards.length % 2 === 0 && roundCards.length >= 2) {
            moveRoundTo(SituationTypes.MOVE_ROUND_TO_TRASH);
            dispatch(changeTurnAttack())
            dispatch(changeTurnWalk())
        }
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


    const addCardsToPlayers = status => {
        let newCardsToUser = []
        let newCardsToComputer = []
        let cutedColoda = []

        //We use this structure because we lost cards
        switch (status) {
            case SituationTypes.COMPUTER_LOST_ROUND:
                [newCardsToUser, cutedColoda] = prepareCardsTo(userCards, colodaCards);
                //Computer will take cards from table
                break;
            case SituationTypes.USER_LOST_ROUND:
                [newCardsToComputer, cutedColoda] = prepareCardsTo(computerCards, colodaCards);
                //User will take cards from table
                break;
            case SituationTypes.START_GAME:
            case SituationTypes.MOVE_ROUND_TO_TRASH:
                [newCardsToUser, cutedColoda] = prepareCardsTo(userCards, colodaCards);
                [newCardsToComputer, cutedColoda] = prepareCardsTo(computerCards, cutedColoda)
                break;
        }

        dispatch(Action.User.addCards(sortByLevel(newCardsToUser)))
        dispatch(Action.Coloda.init(cutedColoda))
        dispatch(Action.Computer.addCards(sortByLevel(newCardsToComputer)));
    }

    const handleSetMoveCard = card => {
        setCardsMove([...cardsMove, card])

        //Here we delete move card after some time.
        setTimeout(() => {
            const filteredCards = cardsMove.filter(cm => cm.suit !== card.suit && cm.title !== card.title)
            setCardsMove(filteredCards);
        }, 1000)
    }

    return (
        <Wrapper className="play-room-page">
            <ComputerCards passRound={passRound} moveRoundTo={moveRoundTo}/>
            <Table className="table">
                <WalkMessage/>
                <TableCenter className="table-center">
                    <Round cards={roundCards}/>
                    <TableRight className={'table-right'}>
                        <Trump trumpCard={getFirsColodaCard()} cardCount={colodaCards.length}/>
                        <Trash amount={trashCards.length}/>
                    </TableRight>
                </TableCenter>
                {/*{<Player isWalk={!isComputerWalk} owner="User" />}*/}
                <UserCards handleSetMoveCard={handleSetMoveCard} passRound={passRound} moveRoundTo={moveRoundTo}/>
                {cardsMove &&
                    cardsMove.map(cm => <CardMover key={cm.title + cm.suit} moveCard={cm}/>)
                }
            </Table>
            <DevInfo/>
        </Wrapper>
    );
}

export default App;

