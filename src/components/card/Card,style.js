import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 75px;
  max-height: 75px;
  width: 50px;
  border: solid 1px ;
  border-radius: 3px;
  position: relative;
  border: solid 1px ${p => p.isTrump ? '#3eff56' : 'black'};
  color:  ${p => p.isTrump ? '#3eff56' : 'black'}
`;
export const Title = styled.div`
  font-size: 20px;
  line-height: 21px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 1px;
  top: 1px;
`;

export const Suit = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  font-size: 34px;
`;