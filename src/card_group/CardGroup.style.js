import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 2px 0;
  position: relative;
  padding: 30px 20px 0 0;
  border: solid 1px #0f6c1b;
  display: flex;

  width: 480px;
  flex-wrap: wrap;
  //height: 30px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
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

export const Owner = styled.div`
  position: absolute;
  top: 0;
  left: 6px;
`;