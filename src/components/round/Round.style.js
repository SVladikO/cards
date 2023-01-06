import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: inherit;
  flex-direction: column;
  border: solid 1px white;
  height: 214px;
  border-radius: 5px;
  position: relative;
  padding: 20px ;
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
export const Message = styled.div`
  position: absolute;
  top: 0;
  right: 26px;
`;
export const Title = styled.div`
  position: absolute;
  top: 0;
  left: 6px;
`;
export const BottomPart = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
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

export const Button2 = styled.button`
  position: absolute;
  bottom: 0;
  right: 6px;
`;