import { h, Component } from 'preact';
import Icon from '@components/Icon';

export default class PauseIcon extends Component {
    render() {
        return (
            <Icon {...this.props} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </Icon>
        );
    }
}
