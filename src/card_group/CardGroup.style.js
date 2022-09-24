import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  padding: 20px 20px 0 0;
  border: solid 1px blue;
  display: flex;
  //width: 300px;
  flex-wrap: wrap;
  //height: 30px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
`;
// export const Wrapper = styled.div``
// export const Wrapper = styled.div``

export const Count = styled.div`
  position: absolute;
  top: 0;
  right: 6px;
`;