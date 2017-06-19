import React from 'react';
import Workfield from '../../components/Workfield';

export default class Rhythmic extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div >
                <div className="list list--animated">
                    <Workfield text={this.props.tableText}/>
                </div>
            </div>
        )
    }
}