import React, { Component } from 'react';
import Icon from '../Icon';

export default class PlayIcon extends Component {
    render() {
        return (
            <Icon {...this.props} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </Icon>
        );
    }
}
