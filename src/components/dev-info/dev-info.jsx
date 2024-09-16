import CardGroup from '../card-group/card-group'
import {Action} from "../../redux/common_card_slice";
import {useDispatch, useSelector} from "react-redux";
import {StoreNames} from "../../redux/type";

export default function DevInfo() {
    const isComputerAttack = useSelector(state => state.gameDetails.isComputerAttack);
    const isComputerWalk = useSelector(state => state.gameDetails.isComputerWalk);

    const computerCards = useSelector(state => state[StoreNames.COMPUTER_CARDS].value);
    const userCards = useSelector(state => state[StoreNames.USER_CARDS].value);
    const roundCards = useSelector((state) => state[StoreNames.ROUND_CARDS].value);
    const colodaCards = useSelector((state) => state[StoreNames.COLODA_CARDS].value);
    const trashCards = useSelector((state) => state[StoreNames.TRASH_CARDS].value);

    const dispatch = useDispatch();
    const attackMessage = isComputerAttack ? "Computer" : 'User';
    const walkMessage = isComputerWalk ? "Computer" : 'User';

    //For dev porpose we need some dev instruments to test some cases
    function handleAddCardToComputer(index) {
        const excludedCard = colodaCards.find((c, i) => i === index);
        const filteredColodaCards = colodaCards.filter((c, i) => i !== index);
        dispatch(Action.Coloda.init(filteredColodaCards));
        dispatch(Action.Computer.addCard(excludedCard));
    }

    return (
        <div>
            <div>Attack {attackMessage}/ Walk {walkMessage}</div>
            <div>ComputerCards: {computerCards.length}</div>
            <div>UserCards: {userCards.length}</div>
            <div>RoundCards: {roundCards.length}</div>
            <div>TrashCards: {trashCards.length}</div>
            <div>ColodaCards: {colodaCards.length}</div>
            <div>Trash</div>
            <CardGroup
                ownerName='Trush'
                cards={trashCards}
                handleAddCardToComputer={handleAddCardToComputer}
            />
            <div>Coloda</div>
            <CardGroup
                ownerName='Coloda'
                cards={colodaCards}
                handleAddCardToComputer={handleAddCardToComputer}
            />
        </div>
    )
}