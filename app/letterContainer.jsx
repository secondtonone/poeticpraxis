import React from 'react';


export default class Letter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.state.letter = this.refs.Letter;
    }

    render() {

        if(this.props.type === 'black') {
            return (<span className="{this.props.type}" contentEditable="true" id="{this.props.id}" ref="Letter">{this.props.symbol}</span>);
        }

        if(this.props.type === 'regular') {
            return (<span className="{this.props.type}" contentEditable="true" id="{this.props.id}">{this.props.symbol}</span>);
        }

        return (<span contentEditable="true">{this.props.symbol}</span>);
    }
}