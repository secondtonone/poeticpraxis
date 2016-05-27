import React from 'react';
import WorkField from './workField.jsx';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <div className="lists">
                    <WorkField/>
                </div>
        )
    }
}