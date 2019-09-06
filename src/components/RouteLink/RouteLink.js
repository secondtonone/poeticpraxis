import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'menu__item_active';

const StyledNavLink = styled(NavLink).attrs(() => ({
    activeClassName
}))`
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};

    &.${activeClassName} {
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
    }
`;

export default function RouterNavLink({ children, ...props }) {
    return (
        <StyledNavLink activeClassName={activeClassName} {...props}>
            {children}
        </StyledNavLink>
    );
}
