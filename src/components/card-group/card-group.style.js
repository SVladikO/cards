import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 10px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    
    ${p => p.isSelected 
            ? 'background: #68eb4d;' : ''};

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
