import React from "react";

import {Wrapper} from './menu.page.style';

import {ROUTE_LINK} from '../../route.config';


import {PrimaryButton} from "../../components/button/button.style";
import {GameName, GameDescription} from '../../components/text/text.style';
import PlayersAmount from '../../features/players-amount/players-amount';
import SuitsPresentation from "../../features/suit-presentation/suit-presentation";

export default function DurakMenu({handleStartGame}) {
    return (
        <Wrapper>
            <GameName>DURAK</GameName>
            <br/>
            <PlayersAmount/>
            <br/>
            <SuitsPresentation/>

            <a href={ROUTE_LINK.DURAK_ROOM_PAGE}><PrimaryButton>Start Game</PrimaryButton></a>
        </Wrapper>
    )
}