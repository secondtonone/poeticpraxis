import styled from 'styled-components';
import { hexToRgb } from '../../utils';

const PageHeader = styled.header`
    position: fixed;
    z-index: 1001;
    width: 100%;
    background: linear-gradient(
        rgba(${(props) => hexToRgb(props.theme.primaryColor).join(',')}, 0.9),
        rgba(${(props) => hexToRgb(props.theme.primaryColor).join(',')}, 0.1)
    );
    padding: 8px;
    transform: translateY(0);
    transition: transform 0.5s ease-in;

    @media (max-width: 600px) {
        position: fixed;
        bottom: 0;
        background: linear-gradient(
            rgba(
                ${(props) => hexToRgb(props.theme.primaryColor).join(',')},
                0.5
            ),
            rgba(
                ${(props) => hexToRgb(props.theme.primaryColor).join(',')},
                0.8
            ),
            rgba(${(props) => hexToRgb(props.theme.primaryColor).join(',')}, 1)
        );

        ${(props) => props.hidden && `transform: translateY(120%);`};
    }

    @media (max-width: 320px) {
        padding: 8px;
    }
`;

const Logo = styled.a`
    display: block;
    width: 200px;
    height: 100%;
    padding: 16px;

    @media (max-width: 600px) {
        display: none;
    }
`;

const ContentField = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;

    @media (max-width: 600px) {
        position: relative;
        top: auto;
        right: auto;
        text-align: center;
    }
`;

export { PageHeader, Logo, ContentField };
