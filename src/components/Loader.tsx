import { h } from 'preact';
import { FC } from 'preact/compat';
import styled, { keyframes } from 'styled-components';

const stretch = keyframes`
    0%,
    100% {
        transform: scale(0.4, 1);
        opacity: 1;
    }
    80%{
        opacity: 0;
    }
    50% {
        transform: scale(1, 0.4);
        opacity: 1;
    }
`;

const Container = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    margin: 0 0 0 -50px;
    position: relative;
`;

const Wrapper = styled.div<{height?: string}>`
    height: ${({height}) => (height ? height : '85vh')};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

const Rect = styled.div<{
    color?: string
    delay: number
}>`
    position: absolute;
    background-color: ${({color, theme}) =>
        color === 'accent'
            ? theme.accentColor
            : color === 'first'
            ? theme.primaryColor
            : theme.secondColor};
    height: ${({delay}) => delay * 100}%;
    width: ${({delay}) => delay * 100}px;
    color: ${({theme}) => theme.primaryColor};
    font-size: 10px;
    transform-origin: 50% 50%;
    animation: ${stretch} ${({delay}) => delay}s infinite ease-in-out;
`;

const Loader: FC<{height?: string}> = ({ height }) => (
    <Wrapper height={height}>
        <Container>
            <Rect delay={0.8} />
            <Rect delay={0.4} color="accent" />
            <Rect delay={1} color="first" />
        </Container>
    </Wrapper>
);

export default Loader;
