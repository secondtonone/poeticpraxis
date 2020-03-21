import { h } from 'preact';
import Icon from '@components/Icon';

export default function(props) {
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
                    <g id="ui_x5F_spec_x5F_header_copy_3" />
                    <path fill="none" d="M0,0h24v24H0V0z" />
                </g>
                <g id="Outline">
                    <g id="ui_x5F_spec_x5F_header" />
                    <path d="M12,8.41L16.59,13L18,11.59l-6-6l-6,6L7.41,13L12,8.41z M6,18h12v-2H6V18z" />
                </g>
            </svg>
        </Icon>
    );
}
