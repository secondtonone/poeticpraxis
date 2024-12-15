import Icon, { type IconProps } from '@components/Icon';

export default function ({color = '', ...props}: IconProps & { color?: string }) {
  return (
    <Icon {...props}>
      <svg
        width="110px"
        height="100px"
        viewBox="0 0 110 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <defs />
        <g
          id="New-Logo-Copy-3"
          transform="translate(-363.000000, -315.000000)"
          fill={color}>
          <g
            id="Group"
            transform="translate(533.500000, 359.000000) scale(1, -1) translate(-533.500000, -359.000000) translate(363.000000, 285.000000)">
            <path
              d="M78.4117305,61 L67.4825012,61 L55.0555556,38.6594235 L42.6286099,61 L31.6993806,61 L55.0555556,18.8545455 L78.4117305,61 Z M97.2538562,95 L110,118 L0.111111111,118 L12.8572549,95 L23.7161099,95 L16.1180556,108.659424 L93.9930556,108.659424 L86.3950012,95 L97.2538562,95 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </svg>
    </Icon>
  );
}
