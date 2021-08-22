import { h } from 'preact';
import { createPortal } from 'preact/compat';

const Portal = ({ children, id }:{ children: preact.VNode<{}>, id: string }): preact.VNode<{}>  => {
    return createPortal(children, document.getElementById(id));
};

export default Portal;
