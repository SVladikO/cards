import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 10px;
    width: 100vw;
    height: 100vh;
    //padding: 10px;

    display: flex;
    flex-direction: column;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
`;

export const Table = styled.div`
    border-radius: 20px;
`;

export const TableCenter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
`;
export const TableRight = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: space-between;

`;

export const CardGroupsOwnerTitle = styled.div`
    font-size: 20px;
    color: white;
    padding: 10px 0 6px;
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
