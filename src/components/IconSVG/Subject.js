import React, { Component } from 'react';
import Icon from '../Icon';

export default class Subject extends Component {
    render() {
        return (
            <Icon {...this.props} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </Icon>
        );
    }
}
