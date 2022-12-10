import styled from "styled-components";

export const Wrapper = styled.div`
  height: 75px;
  width: 50px;
  border: solid 1px #1ad464;
  border-radius: 3px;
  position: relative;
  background: ${p => p.background || 'white'};
`;
export const Title = styled.div`
  font-size: 20px;
  line-height: 21px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 1px;
  top: 1px;
  color: ${p => p.colorSuit || 'black'};
`;

export const Suit = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  font-size: 34px;
  color: ${p => p.colorSuit || 'black'};
`;