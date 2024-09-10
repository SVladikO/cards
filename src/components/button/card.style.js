import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 75px;
  max-height: 75px;
  width: 50px;
  border: solid 0.5px black;
  border-radius: 3px;
  position: relative;
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
  font-size: 14px;
  position: absolute;
  left: 1px;
  top: 17px;
`;
export const BigSuit = styled.div`
  position: absolute;
  right: 5px;
  bottom: 7px;
  
  font-size: 44px;
  line-height: 39px;
`;