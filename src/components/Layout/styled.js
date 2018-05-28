import styled from 'styled-components';

import { show } from '../../styles/animations';
import { withElements } from '../../styles/helpers';

const MainContent = styled.main`
    padding-top: 180px;

    @media (max-width: 600px) {
        padding: 0 0 100px 0;
    }
`;

const Page = styled.div.attrs({ className: withElements })`
    position: absolute;
    top: 0;
    z-index: 1000;
    min-height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondColor};
    transition: color 0.3s, background-color 0.3s;

    &._animated {
        opacity: 0;
        animation-name: ${show};
        animation-duration: 1.5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
`;

export { MainContent, Page };
