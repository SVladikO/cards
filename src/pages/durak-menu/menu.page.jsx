import React from "react";

import {Wrapper} from './menu.page.style';


import {PrimaryButton} from "../../components/button/button.style";
import {GameName, GameDescription} from '../../components/text/text.style';
import PlayersAmount from '../../components/players-amount/players-amount';
import SuitsPresentation from "../../components/suit-presentation/suit-presentation";

export default function DurakMenu({handleStartGame}) {
    return (
        <Wrapper>
            <GameName>Дурень</GameName>
            <br/>
            <PlayersAmount/>
            <br/>
            <SuitsPresentation/>

            <PrimaryButton onClick={handleStartGame}>Start Game</PrimaryButton>
        </Wrapper>
    )
}