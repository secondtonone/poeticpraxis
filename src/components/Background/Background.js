import { h, Component } from 'preact';
import {randomize} from '../../utils';

import './Background.scss';


export default class Background extends Component {

    render({blocksCount}) {

        let blocks = [];

        for (let i = 0; i < blocksCount; i++) {

            let rotate = (randomize()* i-randomize())/100-i;

            let translateX = (randomize()* blocksCount - i-randomize())/300;

            let translateY = (randomize()* blocksCount - i-randomize())/300;

            let style = {
                transform: `rotate(${rotate}deg) translate(${Math.abs(translateX)}px, ${Math.abs(translateY)}px)`,
                zIndex: i
            };


            blocks.push(
                <div key={i} class="background__block" style={style}></div>
            )
        }

        return (
            <div class="background">
                {blocks}
            </div>
        )
    }
}