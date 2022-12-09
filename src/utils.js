import {maxCardsPerRound} from "./constants";

export const canCardBeAddedToRound = (roundCards, candidateToAdd) =>
    !roundCards.length || roundCards.find(card => card.level === candidateToAdd.level)

export function findHigherCard(cards, cardToCover) {
    return cards.find(card =>
        card.suit === cardToCover.suit && card.level > cardToCover.level
    );
}

export function isTrumpCard(card, trump) {
    return card.suit === trump;
}

const sortCallback = (f, s) => f.level - s.level;

export function findHigherTrumpCard(cards, cardToCover, trump) {
     cards
        ?.filter(card => card.suit === trump)
        ?.sort(sortCallback)
        ?.find(
            card =>
                (card.suit !== cardToCover.suit) ||
                (card.suit === cardToCover.suit && card.level > cardToCover.level)
        );



}


export function addCardsTo(updateArray, coloda) {
    if (updateArray.length >= maxCardsPerRound || coloda.length === 0) {
        return [updateArray, coloda];
    }

    let result = [];
    let canBeAdded = maxCardsPerRound - updateArray.length;

    if (canBeAdded > 0) {
        result = [...updateArray, ...coloda.slice(-canBeAdded)]
    }

    return [result, coloda.slice(0, coloda.length - canBeAdded)];
}