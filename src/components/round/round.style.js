import styled from "styled-components";

export const  Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: self-start;
    border: solid 2px #106601e6;
    border-radius: 5px;
    max-width: 254px;
`;
export const CardPairWrapper = styled.div`
    position: relative;
    width: 52px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
  
    & > div:first-child {

    }

    & > div:last-child {
        position: absolute;
        top: 21px;
        left: 40px;
        transform: rotate(13deg);
    }
`;

