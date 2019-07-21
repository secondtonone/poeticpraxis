import styled from 'styled-components';

import theme from '../../styles/theme';

const Tab = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    text-transform: uppercase;
    border-bottom: ${(props) =>
        props.ative
            ? `2px solid ${props.theme.accentColor}`
            : '2px solid transparent'};
    padding: 8px;
    color: ${(props) => {
        props.active ? props.theme.accentColor : props.theme.secondColor;
    }};
    fill: ${(props) => {
        props.active ? props.theme.accentColor : props.theme.secondColor;
    }};
`;

const Icon = styled.div`
    padding-bottom: 4px;
`;

export { Tab, Icon };
