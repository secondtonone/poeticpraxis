import { h, Component } from 'preact';
import Workfield from '../../components/Workfield';

export default class Rhythmic extends Component {
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

        this.workfield.state.text;

        this.fieldText = this.workfield.state.text;

    }

    copyToClipboard = () => {
            this.workfield.copyToClipboard();
            this.workfield.getSelection();
    }

    makeCaesura = () => {
            this.workfield.makeCaesura();
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



    render(props, state) {

        return (<section>
            <div class="list list--animated">
                <button class="button_rounded field-copy-button animation-up" type="button" disabled={!state.fieldText} onClick={this.copyToClipboard}  title="Копировать в текстовый редактор"><i class="material-icons material-icons--small">content_copy</i>
                </button>

                <button type="button" class="button_rounded button_middle string-pause-button animation-show" onClick={this.makeCaesura} style={state.renderCaesuraButtonStyle} title="Поставить паузу"><i class="material-icons">keyboard_capslock</i></button>

                <button type="button" class="button_rounded button_middle string-pause-button string-pause-button__mobile animation-up" onClick={this.makeCaesura}  title="Поставить паузу"><i class="material-icons">keyboard_capslock</i></button>

                <div onMouseMove={this.mouseTracking}>
                    <Workfield text={props.rhythmicState.text} setRhytmicState={props.setRhytmicState} ref={ ref => this.workfield = ref } />
                </div>
            </div>
        </section>);
    }
}