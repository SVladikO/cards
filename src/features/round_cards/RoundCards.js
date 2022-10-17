import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Table from '../../table'

export function RoundCards() {
    const cards = useSelector((state) => state.roundCards.value);
    const dispatch = useDispatch();

    return <Table cards={cards}/>
}