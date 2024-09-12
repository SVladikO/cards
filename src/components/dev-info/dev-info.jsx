import CardGroup from '../card-group/card-group'

export default function DevInfo({
                                    isComputerAttack,
                                    isComputerWalk,
                                    computerCards,
                                    userCards,
                                    roundCards,
                                    trash,
                                    coloda
                                }) {

    const attackMessage = isComputerAttack ? "Computer" : 'User';
    const walkMessage = isComputerWalk ? "Computer" : 'User';

    return (
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
    )
}