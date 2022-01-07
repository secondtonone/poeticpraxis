import { FunctionalComponent } from 'preact';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const RouterLink: FunctionalComponent<NavLinkProps> = ({ children, ...props }) => {
    return (
        <StyledNavLink activeClassName="menu__item_active" {...props}>
            {children}
        </StyledNavLink>
    );
}

const StyledNavLink = styled(NavLink)`
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};

    &.${props => props.activeClassName} {
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
    }
`;

export default RouterLink;
