import React from "react";

import {Wrapper, SuitWrapper} from './menu.style';

import {cardsData, generateSuits, suits} from "../../utils/cards-data";
import CardGroup from "../card-group/card-group";
import {PrimaryButton} from "../button/button.style";
import {GameName, GameDescription} from '../text/text.style';

export default function GameMenu({handleStartGame, selectedSuitIndex, handleSetSelectedSuit}) {
    const card6 = cardsData[0]; // card 6

    const suitGroups = suits.map(sg => generateSuits(sg))
    const cardGroups = suitGroups.map(suits => {
        const result = [];
        suits.forEach(suit =>
            result.push({...card6, ...suit})
        )
        return result;
    })

    return (
        <Wrapper>
            <GameName>Дурень</GameName>
            <GameDescription>Карткова гра онлайн.
                <br />
                Грайте різними мастями.</GameDescription>
            <br/>
            <br/>
            <SuitWrapper>
                {cardGroups.map((cards, index) =>
                    <div key={index} onClick={() => handleSetSelectedSuit(index)}>
                        <CardGroup
                            isSelected={index === selectedSuitIndex}
                            ownerName={index}
                            cards={cards}
                        />
                    </div>
                )}
            </SuitWrapper>
            <PrimaryButton onClick={handleStartGame}>Start Game</PrimaryButton>
        </Wrapper>
    )
}