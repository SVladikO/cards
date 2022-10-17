import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Table from '../../table'

export function RoundCards() {
    const cards = useSelector((state) => state.roundCards.value);
    const dispatch = useDispatch();

    console.log({cards})

    return <Table cards={cards}/>
}