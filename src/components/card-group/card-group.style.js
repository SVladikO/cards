import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 2px 0;
  position: relative;
  display: flex;
  align-items: end;

  height: 76px;
  flex-wrap: wrap;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
`;

export const CardAbstractWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${p => p.index * 38}px;
`;
