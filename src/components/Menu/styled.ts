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
    display: flex;

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
        left: 0;
        bottom: 0;
        padding: 24px 64px 0;
        display: block;
        float: none;
        text-align: center;
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
        transition: transform 0.1s ease-out;

        &::after {
            content: '';
            position: absolute;
            top: 8px;
            left: 0;
            right: 0;
            border-radius: 4px;
            width: 24px;
            height: 4px;
            margin: 0 auto;
            background: ${(props) => props.theme.primaryGray};
        }
    }
`;

const NavMenuItem = styled.li`
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

    &:last-child {
        padding-right: 0;
    }

    @media (max-width: 600px) {
        padding: 16px 8px;
        line-height: 16px;
        display: block;
    }
`;

const NavMenuIcon = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: block;
    }
`;

const NavMenuTitle = styled.div`
    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

export { NavBar, NavMenu, NavMenuBar, MobileNavMenu, NavMenuTitle, NavMenuIcon, NavMenuItem };
