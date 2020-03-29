import { h } from 'preact';
import { createPortal } from 'preact/compat';

const Portal = ({ children, id }) => {
    return createPortal(children, document.getElementById(id));
};

export default Portal;
