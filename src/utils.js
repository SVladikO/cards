export const canCardBeAddedToRound = (roundCards, candidateToAdd) =>
    !roundCards.length || roundCards.find(card => card.level === candidateToAdd.level)
