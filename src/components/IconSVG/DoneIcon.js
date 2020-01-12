import { h, Component } from 'preact';
import Icon from '../Icon';

export default class DoneIcon extends Component {
    render() {
        return (
            <Icon {...this.props}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
            </Icon>
        );
    }
}
