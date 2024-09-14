export default function WalkMessage({isComputerAttack, isComputerWalk}) {

    return (
        <div style={{height: '20px'}}>
            <div>
                {isComputerAttack && !isComputerWalk && 'Бийся, як лев!'}
            </div>
            <div>
                {!isComputerAttack && !isComputerWalk && 'Ваш хід.'}
            </div>
            <div>
                {isComputerAttack && isComputerWalk && 'Ходить компютер.'}
            </div>
        </div>
    )
}
