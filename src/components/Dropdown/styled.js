import styled from 'styled-components';

const DropdownList = styled.ul`
    position: absolute;
    top: ${(props) => props.top || '-3px'};
    ${(props) => `${props.side || 'left'}: 8px;`}
    list-style: none;
    background: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 150px;
    box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    outline: none;
    ${(props) =>
        props.theme.name === 'dark'
            ? `background: ${props.theme.grayDarkColor};`
            : ''}
    &:focus {
        outline: none;
    }
`;

DropdownList.ListItem = styled.li`
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) =>
        props.active ? props.theme.accentColor : props.theme.secondColor};
`;

export { DropdownList };
