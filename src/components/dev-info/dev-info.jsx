import CardGroup from '../card-group/card-group'
import {Action} from "../../redux/common_card_slice";
import {useDispatch} from "react-redux";

export default function DevInfo({
                                    isComputerAttack,
                                    isComputerWalk,
                                    computerCards,
                                    userCards,
                                    roundCards,
                                    trash,
                                    coloda
                                }) {
    const dispatch = useDispatch();
    const attackMessage = isComputerAttack ? "Computer" : 'User';
    const walkMessage = isComputerWalk ? "Computer" : 'User';

    //For dev porpose we need some dev instruments to test some cases
    function handleAddCardToComputer(index) {
        const excludedCard = coloda.find((c, i) => i === index);
        const filteredColodaCards = coloda.filter((c, i) => i !== index);
        dispatch(Action.Coloda.init(filteredColodaCards));
        dispatch(Action.Computer.addCard(excludedCard));
    }

    return (
        <div>
            <div>Attack {attackMessage}/ Walk {walkMessage}</div>
            <div>ComputerCards: {computerCards.length}</div>
            <div>UserCards: {userCards.length}</div>
            <div>RoundCards: {roundCards.length}</div>
            <div>TrashCards: {trash.length}</div>
            <div>ColodaCards: {coloda.length}</div>
            <div>Trash</div>
            <CardGroup
                ownerName='Trush'
                cards={trash}
                handleAddCardToComputer={handleAddCardToComputer}
            />
            <div>Coloda</div>
            <CardGroup
                ownerName='Coloda'
                cards={coloda}
                handleAddCardToComputer={handleAddCardToComputer}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}