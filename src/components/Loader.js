import { h } from 'preact';
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

const Wrapper = styled.div`
    height: ${(props) => (props.height ? props.height : '85vh')};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

const Rect = styled.div`
    position: absolute;
    background-color: ${(props) =>
        props.color === 'accent'
            ? props.theme.accentColor
            : props.color === 'first'
            ? props.theme.primaryColor
            : props.theme.secondColor};
    height: ${(props) => props.delay * 100}%;
    width: ${(props) => props.delay * 100}px;
    color: ${(props) => props.theme.primaryColor};
    font-size: 10px;
    transform-origin: 50% 50%;
    animation: ${stretch} ${(props) => props.delay}s infinite ease-in-out;
`;

const Loader = ({ height }) => {
    return (
        <Wrapper height={height}>
            <Container>
                <Rect delay={0.8} />
                <Rect delay={0.4} color="accent" />
                <Rect delay={1} color="first" />
            </Container>
        </Wrapper>
    );
};

export default Loader;
