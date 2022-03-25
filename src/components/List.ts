import styled from 'styled-components';

import { up } from '@styles/animations';
import { withElements } from '@styles/helpers';

type ListProps = {
    _animated?: boolean
    sidePaddingMobile?: string | number
};

const List = styled.div.attrs<ListProps>((props) => ({ className: withElements<ListProps>(props)}))<ListProps>`
    position: relative;
    padding: 0 64px 80px;
    max-width: 794px;
    width: 100%;
    min-height: 1042px;
    background-color: transparent;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    transition: all 1.5s ease-in-out;
    opacity: 1;

    &._animated {
        transform: translateY(2000px);
        animation-name: ${up};
        animation-duration: 0.2s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }

    &._horizontal {
        display: inline-block;
        vertical-align: top;
        width: 50%;
    }

    @media (max-width: 880px) {
        min-height: 100%;
    }

    @media (max-width: 794px) {
        width: 100%;
    }

    @media (max-width: 600px) {
        padding: 24px
            ${(props) =>
    props.sidePaddingMobile ? props.sidePaddingMobile : '24px'}
            64px;
    }
`;

export default List;
