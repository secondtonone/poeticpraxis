import Icon, { type IconProps } from '@components/Icon';

const Telegram  = (props: IconProps) => {
  return (
    <Icon {...props}>
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <title>Telegram icon</title>
        <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
      </svg>
    </Icon>
  );
};

export default Telegram;
