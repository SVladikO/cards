import React from "react";
import {useSelector} from "react-redux";
import CardGroup from "../../card_group";

export function ComputerCards() {
    const computerCards = useSelector((state) => state.computerCards.value);

    return <CardGroup cards={computerCards}/>;
}