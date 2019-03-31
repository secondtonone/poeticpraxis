import React from 'react';
import styled, { keyframes } from 'styled-components';

const stretch = keyframes`
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
        opacity: 1;
    }
    40%{
        opacity: 0;
    }
    20% {
        transform: scaleY(1);
        opacity: 1;
    }
`;

const Container = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

const Rect = styled.div`
    background-color: ${(props) => props.theme.secondColor};
    height: ${(props) => props.delay * 100}%;
    width: 10px;
    color: ${(props) => props.theme.primaryColor};
    font-size: 10px;
    display: inline-block;
    transform-origin: 50% 50%;
    animation: ${stretch} ${(props) => props.delay}s infinite ease-in-out;
`;

const Loader = () => {
    return (
        <Container>
            <Rect delay={1} />
            <Rect delay={0.5} />
            <Rect delay={0.4} />
            <Rect delay={0.6} />
            <Rect delay={1.2} />
            <Rect delay={0.3} />
            <Rect delay={1.5} />
            <Rect delay={0.7} />
            <Rect delay={0.9} />
            <Rect delay={1.2} />
            <Rect delay={1.4} />
            <Rect delay={0.3} />
        </Container>
    );
};

export default Loader;
