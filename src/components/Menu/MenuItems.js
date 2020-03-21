import { h } from 'preact';

import { NavMenu } from './styled';

const MenuItems = ({items, render}) =>{ 

    return items.map((item, index) => {
        return (
            <NavMenu.Item key={`menu-${index}`}>
                {render ? render(item) : item}
            </NavMenu.Item>
        );
    });
}

export default MenuItems;
