import { h } from 'preact';

import { Tab, Icon } from './styled';

interface TabsProps {
    items: {
        title: string
        icon: React.ReactNode
    }[]
    handler: () => void
    current: string
}

export default function Tabs({ items, handler, current }: TabsProps) {
    return (
        <>
            {items
                ? items.map((item, index) => {
                    return (
                        <Tab key={index} onClick={handler} active={current === item.title}>
                            <Icon>{item.icon}</Icon>
                            <div>{item.title}</div>
                        </Tab>
                    );
                })
                : null}
        </>
    );
}
