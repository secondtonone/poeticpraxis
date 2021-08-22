import { h } from 'preact';
import Icon, { IconProps } from '@components/Icon';

export default function(props: IconProps) {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd">
                    <g
                        id="sharp-brightness_2-24px"
                        transform="translate(8.000000, 10.000000) scale(-1, 1) translate(-8.000000, -10.000000) translate(-4.000000, 0)">
                        <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                        <path
                            d="M10,2 C8.18,2 6.47,2.5 5,3.35 C7.99,5.08 10,8.3 10,12 C10,15.7 7.99,18.92 5,20.65 C6.47,21.5 8.18,22 10,22 C15.52,22 20,17.52 20,12 C20,6.48 15.52,2 10,2 Z"
                            id="Shape"
                            fill="#000000"
                            fillRule="nonzero"
                        />
                    </g>
                </g>
            </svg>
        </Icon>
    );
}
