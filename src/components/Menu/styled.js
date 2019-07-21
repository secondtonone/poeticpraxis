import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    display: flex;
`;

const NavMenuBar = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: block;
    }
`;

const NavMenu = styled.ul`
    list-style: none;

    @media (max-width: 600px) {
        display: none;
        float: none;
        text-align: center;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }
`;

const MobileNavMenu = styled.ul`
    list-style: none;
    display: none;
    background-color: ${(props) =>
        props.theme.name === 'dark'
            ? props.theme.grayDarkColor
            : props.theme.primaryColor};
    box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        position: fixed;
        z-index: 1003;
        left: 0;
        bottom: 0;
        padding: 16px 64px;
        display: block;
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
        padding: 16px 8px;
        line-height: 16px;
        display: block;
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
        font-size: 16px;
    }
`;

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

function RouterNavLink({ children, ...props }) {
    return (
        <StyledNavLink activeClassName={activeClassName} {...props}>
            {children}
        </StyledNavLink>
    );
}

export { NavBar, NavMenu, RouterNavLink, NavMenuBar, MobileNavMenu };
