import type { FunctionalComponent } from 'preact';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const RouterLink: FunctionalComponent<NavLinkProps> = ({ children, ...props }) => {
  return (
    <NavLink className={({ isActive }) => `nav-link${isActive ? '__activated' : ''}`} {...props}>
      <StyledNavLink>{children}</StyledNavLink>
    </NavLink>
  );
};

const StyledNavLink = styled.span`
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};

    .nav-link__activated & {
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
    }
`;

export default RouterLink;
