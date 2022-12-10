import React from "react";
import {useSelector} from "react-redux";
import CardGroup from "../../components/card_group";
import {StoreNames} from "../../redux/type";

export function ComputerCards() {
    const computerCards = useSelector((state) => state[StoreNames.COMPUTER_CARDS].value);

    return <CardGroup cards={computerCards} ownerName="Computer cards"/>;
}