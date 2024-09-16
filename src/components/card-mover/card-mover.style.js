import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: ${p => p.fromLeft}px;
    top: ${p => p.fromTop}px;
    animation: 1s linear example;
    //animation-name: example;
    //animation-duration: 1s;

    @keyframes example {
        0%   {background-color:red; left:${p => p.fromLeft}px; top:${p => p.fromTop}px;}
        100% {background-color:red; left:${p => p.toLeft}px; top:${p => p.toTop}px;}
    }
`;

