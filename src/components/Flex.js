import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    position: ${(props) => (props.position ? props.position : 'relative')};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
    justify-content: ${(props) => (props.justify ? props.justify : 'center')};
    align-items: ${(props) => (props.align ? props.align : 'center')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
    ${(props) => (props.maxWidth ? `max-width:${props.maxWidth}` : '')}
    ${(props) => (props.minWidth ? `min-width:${props.minWidth}` : '')}
`;

export default Flex;
