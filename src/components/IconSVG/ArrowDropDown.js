import { h, Component } from 'preact';
import Icon from '@components/Icon';

export default class ArrowDropDown extends Component {
    render() {
        return (
            <Icon {...this.props} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </Icon>
        );
    }
}
