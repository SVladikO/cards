import styled from "styled-components";

export const PrimaryButton = styled.button`
    font-size: 22px;
    padding: 5px 15px;
    background: #68eb4d;

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