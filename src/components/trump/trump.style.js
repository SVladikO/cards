import styled from "styled-components";

export const Wrapper = styled.div`
    & > div:last-child {
        position: relative;
        right: -64px;
        bottom: 54px;
    }
`;
export const InnerWrapper = styled.div`
    display: flex;
    gap: 4px;
    transform: rotate(0deg);
    //border: solid 1px red;
    width: 104px;

    & > div:last-child {
        //position: absolute;
        //right: 0;
        //bottom: 55px;
        //transform: rotate(100deg);
    }
`;