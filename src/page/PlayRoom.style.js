import styled from "styled-components";

export const Wrapper = styled.div`
  border: solid 10px #106601e6;
  position: relative;
  height: 410px;
  padding: 10px;

  display: flex;
  //flex-wrap: wrap;
  //flex-direction: column;
  //align-content: flex-start;

  background: #389638;
  border-radius: 20px;
  margin: 20px 0;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
`;

export const Table = styled.div`
  border-radius: 20px;
`;

export const Trump = styled.div`
  font-size: 20px;
`;

export const Count = styled.div`
  position: absolute;
  top: 0;
  right: 6px;
`;
export const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 6px;
`;
