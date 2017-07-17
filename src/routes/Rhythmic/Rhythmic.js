import React from 'react';
import Workfield from '../../components/Workfield';

export default class Rhythmic extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    copyToClipboard = () => {
            this.refs.workfield.copyToClipboard();
    }


    render() {

        return (
            <div >
                <div className="list list--animated">
                    <button className="button_rounded field-copy-button" type="button" onClick={this.copyToClipboard}  title="Копировать в текстовый редактор"><i className="material-icons material-icons--small">content_copy</i>
                    </button>
                    <Workfield text={this.props.tableText} ref="workfield"/>
                </div>
            </div>
        )
    }
}