import Icon, { type IconProps } from '@components/Icon';

export default function(props: IconProps) {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <defs>
          <path id="a" d="M0 0h24v24H0V0z" />
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path
          clipPath="url(#b)"
          d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"
        />
      </svg>
    </Icon>
  );
}
