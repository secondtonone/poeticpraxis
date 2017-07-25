import React from 'react';
import Workfield from '../../components/Workfield';

export default class Rhythmic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderCaesuraButtonStyle:{
                top: 64
            },
            fieldText: ''
        };
    }

    componentDidMount(){
        window.scrollTo(0,0);

        this.refs.workfield.state.text;

        this.fieldText = this.refs.workfield.state.text;

    }

    copyToClipboard = () => {
            this.refs.workfield.copyToClipboard();
    }

    makeCaesura = () => {
            this.refs.workfield.makeCaesura();
    }

    getChildData = (data) => {
        this.setState(data);
    }

    mouseTracking = (e) => {


        /*if(this.mouseTrackingTimer) {
            window.clearTimeout(this.mouseTrackingTimer);
        }



        this.mouseTrackingTimer = setTimeout(()=>{*/

            let top = e.pageY-270 < 0 ? 0: Math.floor(e.pageY-270);

            const renderCaesuraButtonStyle = {
                top
            };

            this.setState({
                renderCaesuraButtonStyle
            });

        /*},50);*/


    }



    render() {

        return (
            <div >
                <div className="list list--animated" ref="list">
                    <button className="button_rounded field-copy-button animation-up" type="button" disabled={!this.state.fieldText} onClick={this.copyToClipboard}  title="Копировать в текстовый редактор"><i className="material-icons material-icons--small">content_copy</i>
                    </button>

                    <button type="button" className="button_rounded button_middle string-pause-button animation-show" onClick={this.makeCaesura} style={this.state.renderCaesuraButtonStyle} title="Поставить паузу"><i className="material-icons">keyboard_capslock</i></button>

                    <button type="button" className="button_rounded button_middle string-pause-button string-pause-button__mobile animation-up" onClick={this.makeCaesura}  title="Поставить паузу"><i className="material-icons">keyboard_capslock</i></button>

                    <div onMouseMove={this.mouseTracking}>
                        <Workfield text={this.props.tableText} toParent={this.getChildData} ref="workfield" />
                    </div>
                </div>
            </div>
        )
    }
}