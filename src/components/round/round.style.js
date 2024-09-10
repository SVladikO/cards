import styled from "styled-components";

export const  Wrapper = styled.div`
    position: relative;
    padding: 0 0 40px 0;
`;
export const InnerWrapper = styled.div`
    display: flex;
    flex-wrap: inherit;
    flex-direction: column;
    border: solid 2px #106601e6;
    border-radius: 5px;
    position: relative;
    padding: 10px 10px 10px;
    margin: 10px 2px;
`;

export const CardPairWrapper = styled.div`
    //border: solid 2px orange;
    position: relative;
    width: 52px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    //border: solid 2px red;
  
    & > div:first-child {

    }

    & > div:last-child {
        position: absolute;
        top: 10px;
        left: 28px;
        transform: rotate(13deg);
    }
`;

export const AttackRowWrapper = styled.div`
    display: flex;
    width: 250px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    & > div {
        margin: 0 20px 0 0;
    }

    //border: solid 2px red;
`;


export const DefenceRowWrapper = styled.div`
    display: flex;
    position: relative;
    top: -15px;
    left: 20px;

    //border: solid 2px orange;

    & > div {
        margin: 0 20px 0 0;
    }
`;

export const Count = styled.div`
    position: absolute;
    top: 0;
    right: 6px;
`;
export const EmptyCard = styled.div`
  min-height: 75px;
  max-height: 75px;
  width: 50px;
  border: solid 2px #3bb055c4;
  border-radius: 3px;
  box-sizing: border-box;
`;

export const CardsWrapper = styled.div`
    //border: solid 3px red;
    display: flex;
    //gap: 10px;
    flex-direction: column;
    align-items: self-start;
    flex-direction: row;
    flex-wrap: wrap;
    //width: 274px;
    //height: 200px;
    justify-content: center;
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
    transform: rotate(-40deg);
    border: solid 1px red;
    width: 100px;
    position: absolute;
    right: -40px;
    bottom: -45px;
    
    & > div:last-child {
        //position: absolute;
        background: red;
        //transform: rotate(-90deg);
        //bottom: -30px;
        //left: 0;
    }
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
