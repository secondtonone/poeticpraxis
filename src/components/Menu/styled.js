import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    display: ${(props) => props.inline? 'inline-block': 'block'};
`;

const NavMenu = styled.ul`
    list-style: none;

    @media (max-width: 600px) {
        float: none;
        text-align: center;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }
`;

NavMenu.Item = styled.li`
    display: inline-block;
    padding: 16px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0px;
    word-spacing: 2px;
    font-size: 16px;
    font-weight: 400;
    line-height: 32px;
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};

    @media (max-width: 600px) {
        padding: 10px 8px;
        line-height: 16px;
        width: 106px;
    }
`;

NavMenu.Icon = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: block;
    }
`;

NavMenu.Title = styled.div`
    @media (max-width: 600px) {
        font-size: 8px;
    }
`;

const activeClassName = 'menu__item_active';

const StyledNavLink = styled(NavLink).attrs( () => ({
    activeClassName
}))`
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};

    &.${activeClassName} {
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
    }
`;

function RouterNavLink({ children, ...props }) {
    return (
        <StyledNavLink activeClassName={activeClassName} {...props}>
            {children}
        </StyledNavLink>
    );
}

export { NavBar, NavMenu, RouterNavLink };
