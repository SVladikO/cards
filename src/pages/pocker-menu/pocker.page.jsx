import React from "react";

import {Wrapper} from './pocker.page.style';

import {PrimaryButton} from "../../components/button/button.style";
import {GameName, GameDescription} from '../../components/text/text.style';
import PlayersAmount from '../../features/players-amount/players-amount';
import SuitsPresentation from "../../features/suit-presentation/suit-presentation";

export default function PockerMenu({handleStartGame}) {
    return (
        <Wrapper>
            <GameName>POCKER</GameName>
            <br/>
            <PlayersAmount/>
            <br/>
            <SuitsPresentation/>
            <PrimaryButton onClick={handleStartGame}>Start Game</PrimaryButton>
        </Wrapper>
    )
}