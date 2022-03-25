import { createPortal } from 'preact/compat';

const Portal = ({ children, id }:{ children: preact.VNode<Record<string, never>>, id: string }): preact.VNode<Record<string, never>>  => {
  // @ts-ignore
  return createPortal(children, document.getElementById(id));
};

export default Portal;
