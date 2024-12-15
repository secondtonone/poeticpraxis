import Icon, { type IconProps } from '@components/Icon';

export default function(props: IconProps) {
  return (
    <Icon {...props}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        enableBackground="new 0 0 24 24">
        <g id="Bounding_Boxes">
          <g id="ui_x5F_spec_x5F_header_copy_3" display="none" />
          <path fill="none" d="M0,0h24v24H0V0z" />
        </g>
        <g id="Outline">
          <g id="ui_x5F_spec_x5F_header" display="none" />
          <g>
            <path d="M16,1H4C2.9,1,2,1.9,2,3v14h2V3h12V1z" />
            <path d="M15,5H8C6.9,5,6.01,5.9,6.01,7L6,21c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V11L15,5z M8,21V7h6v5h5v9L8,21z" />
          </g>
        </g>
      </svg>
    </Icon>
  );
}
