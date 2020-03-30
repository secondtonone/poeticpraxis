import styled from 'styled-components';

const Container = styled.div`
    width: ${(props) => (props.width ? props.width : '100%')};
    display: ${(props) => (props.display ? props.display : 'block')};
    position: ${(props) => (props.position ? props.position : 'relative')};
    height: ${(props) => (props.height ? props.height : '100%')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
    z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
    top: ${(props) => (props.top ? props.top : 'auto')};
    bottom: ${(props) => (props.bottom ? props.bottom : 'auto')};
    left: ${(props) => (props.left ? props.left : 'auto')};
    right: ${(props) => (props.right ? props.right : 'auto')};
    ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
    ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
`;
export default Container;
