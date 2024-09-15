import styled from "styled-components";
import {cardCommonCss} from '../card/card.style';

export const CardEmpty = styled.div`
  ${cardCommonCss};
  border: solid 2px #3bb055c4;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3bb055c4;
  font-size: 24px;
  
  ${p => p.isSelected && `color: black; border-color: black`};
  
`;