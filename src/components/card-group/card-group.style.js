import styled, {css} from "styled-components";

export const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Wrapper = styled.div`
    width: fit-content;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    //align-items: start;
    //justify-content: center;

    ${p => p.isSelected ? 'background: #68eb4d;' : ''};

    height: 76px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
`;

export const CardAbstractWrapper = styled.div`
    width: 45px;
`;
