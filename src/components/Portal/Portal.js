import { h } from 'preact';
import { createPortal, useEffect } from 'preact/compat';

const Portal = ({ children, id }) => {
    return createPortal(children, document.getElementById(id));
};

export default Portal;
