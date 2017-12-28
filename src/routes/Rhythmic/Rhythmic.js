import { h, Component } from 'preact';
import Workfield from '../../components/Workfield';

export default class Rhythmic extends Component {
    constructor (props) {
        super(props);

        this.state = {
            renderCaesuraButtonStyle: {
                top: 64
            },
            fieldText: ''
        };
    }

    componentDidMount () {
        window.scrollTo(0, 0);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('mobile device');
        }
    }

    copyToClipboard = () => {
            this.workfield.copyToClipboard();
            // this.workfield.getSelection();
    }

    makeCaesura = () => {
            this.workfield.makeCaesura();
    }

    getChildData = (data) => {
        this.setState(data);
    }

    mouseTracking = (e) => {
        /* if(this.mouseTrackingTimer) {
            window.clearTimeout(this.mouseTrackingTimer);
        }

        this.mouseTrackingTimer = setTimeout(()=>{*/

            /* let top = e.pageY - 270 < 0 ? 0 : Math.floor(e.pageY - 270);*/
            let transform = `translateY(${e.pageY - 270 < 0 ? 0 : Math.floor(e.pageY - 270)}px)`

            const renderCaesuraButtonStyle = {
                /* top*/
                transform
            };

            this.setState({
                renderCaesuraButtonStyle
            });

        /* },50);*/
    }

    render ({ setRhytmicState, setWordsDictionary, sharedText, rhythmicState, wordsDictionary}, {renderCaesuraButtonStyle}) {
        return (<section>
            <div class="list list--animated">
                <button class="button_rounded field-copy-button animation-up" type="button" disabled={!rhythmicState.text} onClick={this.copyToClipboard} title="Копировать в текстовый редактор"><i class="material-icons material-icons--small">content_copy</i>
                </button>

                <button type="button" class="button_rounded button_middle string-pause-button animation-show" onClick={this.makeCaesura} style={renderCaesuraButtonStyle} title="Поставить паузу"><i class="material-icons">keyboard_capslock</i></button>

                <button type="button" class="button_rounded button_middle string-pause-button string-pause-button__mobile animation-up" onClick={this.makeCaesura} title="Поставить паузу"><i class="material-icons">keyboard_capslock</i></button>

                <div onMouseMove={this.mouseTracking}>
                    <Workfield text={sharedText || rhythmicState.text} setRhytmicState={setRhytmicState} setWordsDictionary={setWordsDictionary} wordsDictionary={wordsDictionary} ref={ ref => this.workfield = ref } />
                </div>
            </div>
        </section>);
    }
}