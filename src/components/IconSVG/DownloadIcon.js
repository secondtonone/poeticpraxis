import { h, Component } from 'preact';
import Icon from '@components/Icon';

export default class DownloadIcon extends Component {
    render() {
        return (
            <Icon {...this.props}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </Icon>
        );
    }
}
