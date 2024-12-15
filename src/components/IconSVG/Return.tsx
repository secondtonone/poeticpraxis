import Icon, { type IconProps } from '@components/Icon';

export default function (props: IconProps) {
  return (
    <Icon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
        <path d="M4.8,24 L0,19.2 L4.8,14.4 L6.06,15.72 L3.48,18.3 L17.4,18.3 L17.4,13.5 L19.2,13.5 L19.2,20.1 L3.48,20.1 L6.06,22.68 L4.8,24 Z M2.4,10.5 L2.4,3.9 L18.12,3.9 L15.54,1.32 L16.8,0 L21.6,4.8 L16.8,9.6 L15.54,8.28 L18.12,5.7 L4.2,5.7 L4.2,10.5 L2.4,10.5 Z" />
      </svg>
    </Icon>
  );
}
