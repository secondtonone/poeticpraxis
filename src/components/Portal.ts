import { createPortal } from 'preact/compat';

const Portal = ({ children, id }:{ children: preact.VNode<{}>, id: string }): preact.VNode<{}>  => {
    // @ts-ignore
    return createPortal(children, document.getElementById(id));
};

export default Portal;
