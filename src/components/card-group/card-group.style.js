import styled, {css} from "styled-components";

export const animatedBorder = css`
    @keyframes rotate {
        100% {
            transform: rotate(1turn);
        }
    }

    &::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -100%;
        width: 200%;
        height: 300%;
        background-color: orange;
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        background-image: linear-gradient(green, green),
        linear-gradient(red, red),
        linear-gradient(orange, orange),
        linear-gradient(blue, blue);
        animation: rotate 4s linear infinite;
    }

    &::after {
        content: '';
        position: absolute;
        background: red;
        z-index: -1;
        left: 6px;
        top: 6px;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
        background: white;
        border-radius: 5px;
    }
`;

export const Wrapper = styled.div`
    padding: 10px;
    width: fit-content;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    padding: 2rem;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;

    ${p => p.isSelected ? 'background: #68eb4d;' : ''};

    height: 76px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/

    ${p => p.isEnabledWalk && animatedBorder}
`;

export const CardAbstractWrapper = styled.div`
    width: 45px;
`;
