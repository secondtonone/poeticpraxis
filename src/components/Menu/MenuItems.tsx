import { NavMenuItem } from './styled';

interface MenuItemsProps<T> {
    items: T[];
    render?: (item: T) => React.ReactNode;
}

const MenuItems = <T extends object | React.ReactNode>({ items, render }: MenuItemsProps<T>) => (
    <>
        {items.map((item, index) => (
            <NavMenuItem key={`menu-${index}`}>
                {render ? render(item) : item}
            </NavMenuItem>
        ))}
    </>
);

export default MenuItems;
