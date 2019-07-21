import React from 'react';

import { Tab, Icon } from './styled';

export default function Tabs({ items, handler, current, variant = 'light' }) {
    return (
        <div>
            {items
                ? items.map((item, index) => {
                    return (
                        <Tab key={index} onClick={handler} active={current}>
                            <Icon>{item.icon}</Icon>
                            <div>{item.title}</div>
                        </Tab>
                    );
                })
                : null}
        </div>
    );
}
