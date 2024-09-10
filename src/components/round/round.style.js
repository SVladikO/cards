import styled from "styled-components";

export const  Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: inherit;
    flex-direction: column;
    border: solid 2px #106601e6;
    border-radius: 5px;
    position: relative;
    padding: 10px 10px 10px;
    max-width: 400px;
    margin: 0 auto;
`;

export const CardsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-start;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 260px;
`;
export const CardPairWrapper = styled.div`
    position: relative;
    width: 52px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    padding: 14px 32px 0 0;
  
    & > div:first-child {

    }

    & > div:last-child {
        position: absolute;
        top: 12px;
        left: 16px;
        transform: rotate(13deg);
    }
`;

export const EmptyCard = styled.div`
  min-height: 75px;
  max-height: 75px;
  width: 50px;
  border: solid 2px #3bb055c4;
  border-radius: 3px;
  box-sizing: border-box;
`;

export const Message = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    justify-content: center;
`;
export const Title = styled.div`
    position: absolute;
    top: 0;
    left: 6px;
`;
export const TrumpWrapper = styled.div`
    display: flex;
    transform: rotate(0deg);
    border: solid 1px red;
    width: 50px;
    position: absolute;
    right: 0;
    bottom: 55px;
`;
export const BottomPart = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;

    & > svg {
        height: 30px;
        width: 30px;
        cursor: pointer;
    }
`;
export const Button = styled.button`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
        height: 20px;
        width: 20px;
    }
`;
