import styled, {css} from "styled-components";

export const cardCommonCss = css`
    min-height: 75px;
    max-height: 75px;
    width: 50px;
    border-radius: 3px;
    position: relative;
    box-sizing: border-box;
`

export const Wrapper = styled.div`
    ${cardCommonCss};
    border: solid 0.5px black;
    margin: ${p => p.isTrump ? '0 0 10px' : '0'};
    color: ${p => p.colorSuit};
    background: white;
`;

export const Title = styled.div`
    font-size: 20px;
    line-height: 21px;

    width: 20px;
    display: flex;
    justify-content: center;

    position: absolute;
    left: 1px;
    top: 0px;
`;

export const SmallSuit = styled.div`
    width: 20px;
    display: flex;
    justify-content: center;
    font-size: 16px;
    position: absolute;
    left: 1px;
    top: 17px;
`;
export const BigSuit = styled.div`
    position: absolute;
    right: 0;
    bottom: 7px;

    font-size: 32px;
    line-height: 39px;
`;