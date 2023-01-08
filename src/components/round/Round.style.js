import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: inherit;
  flex-direction: column;
  border: solid 1px green;
  height: 190px;
  border-radius: 5px;
  position: relative;
  padding: 10px 120px 10px 10px;
`;
export const AttackRowWrapper = styled.div`
  display: flex;
  &>div {margin: 0 20px 0 0;}
`;
export const DefenceRowWrapper = styled.div`
  display: flex;
  position: relative;
  top: -15px;
  left: 10px;
  
  &>div {margin: 0 20px 0 0;}
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
  border: solid 2px white;
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
  position: absolute;
  top: 90px;
  right: 0;
  display: flex;
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
