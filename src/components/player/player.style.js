import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    
    padding: 0 10px;

    height: 60px;
    //border: solid 1px black;
`;

export const ThinkWrapper = styled.div`
    //border: solid 1px red;
    height: 40px;
    width: 40px;
    
    //background: #389638;
    position: absolute;
    top: 0px;
    left: 30px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
        width: 30px;
        height: 30px;
        -webkit-animation: spin 4s linear infinite;
        -moz-animation: spin 2s linear infinite;
        animation: spin 4s linear infinite;
    }

    @-moz-keyframes spin {
        100% {
            -moz-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
`;

export const Emoji = styled.div`
    //border: solid 1px red;
    font-size: 44px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Owner = styled.div`
    font-size: 20px;
`;