import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Round from '../../round/Round'

export function RoundCards() {
    const cards = useSelector((state) => state.roundCards.value);

    return <Round cards={cards}/>
}