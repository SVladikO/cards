import styled from "styled-components";

export const PrimaryButton = styled.button`
    font-size: 22px;
    padding: 5px 15px;
    background: ${p => p.isDisabled ? 'grey': '#68eb4d'};

    &:hover {
        background: #2be102;
    }

    &:active {
        background: #22bc01;
    }
`;

export const SecondaryButton = styled.button`
    font-size: 22px;
    padding: 5px 15px;
    background: none;
    border: solid 2px black;
`;

const users = [
    {name: 2351, age: 26, gender: 'man', isMakeMinet: false, isBeautifully: true},
    {name: 90909, age: 26, gender: 'man', isMakeMinet: true, isBeautifully: true},
    {name: 2621, age: 26, gender: 'man', isMakeMinet: false, isBeautifully: false},
    {name: 72461, age: 26, gender: 'man', isMakeMinet: true, isBeautifully: true},


    {name: 2, age: 21, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 22, age: 21, gender: 'woman', isMakeMinet: false, isBeautifully: false},
    {name: 343, age: 40, gender: 'woman', isMakeMinet: true, isBeautifully: false},
    {name: 5344, age: 51, gender: 'woman', isMakeMinet: false, isBeautifully: true},
    {name: 25, age: 55, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 3456, age: 60, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 752, age: 80, gender: 'woman', isMakeMinet: false, isBeautifully: true},
    {name: 7523, age: 17, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 75256, age: 17, gender: 'woman', isMakeMinet: true, isBeautifully: false},
    {name: 6237, age: 34, gender: 'woman', isMakeMinet: false, isBeautifully: false},
    {name: 56237, age: 33, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 73567, age: 59, gender: 'woman', isMakeMinet: true, isBeautifully: true},
    {name: 63457, age: 16, gender: 'woman', isMakeMinet: true, isBeautifully: false},
]