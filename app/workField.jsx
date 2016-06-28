import React from 'react';
import $ from 'jquery';
import letterContainer from './letterContainer.jsx';
/*
    добавление букв можно написать через react, ровно как и тэгов
*/


class WorkField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vowelArray: [],
            string:{},
            tagsArray: []
        };

        this.counterChar = 0;
    }

    componentDidMount(){
        setTimeout(this.fieldFocusing, 8000);
    }

    fieldFocusing() {
        document.getElementById('field').focus();
    }

    isVowel(char) {
        return /^[aeiouуеыаоэёяию]$/.test(char.toLowerCase());
    }

    isLetter(char) {
        return /^[a-zA-ZА-Яа-яёЁ]$/.test(char.toLowerCase());
    }

    isBreakLine(char) {
        return /\n/g.test(char.toLowerCase());
    }

    handleTextChange(e) {

        const self = this;

        let ghostWorkField = $('.fake-field');


        $('#field').find('span').remove();

        console.log(e.target.innerText);

        e.preventDefault();

        var children = e.target.innerText.split("");

        $.each(children, function(index) {

            let symbol = this;

            let temp = $('<span/>', {
                    contentEditable: false
                });

            if (self.isLetter(symbol)) {

                let id = ++self.counterChar;

                let className = '';

                if (self.isVowel(symbol)) {

                    id = 'v-' + id;

                    className = 'black';

                    /*temp.addClass('black').attr('id',id);*/

                    self.state.vowelArray.push('v-' + id);

                } else {

                    id = 'c-' + id;

                    className = 'regular';

                    /*temp.addClass('regular').attr('id', id);*/

                }

                this.state.tagsArray.push(<Letter type={className} id={id} symbol={symbol} />);

            }

            if (self.isBreakLine(symbol)) {
                temp = $('<div/>', {
                    contentEditable: false
                });
            }

            /*temp[0].innerHTML = symbol;

            symbol = temp[0].outerHTML;


            this.state.tagsArray.push(symbol);*/

            this.state.tagsArray.push(<Letter symbol={symbol} />);


        });

        console.log(this.state.tagsArray);

        ghostWorkField[0].innerHTML = '';

        ghostWorkField.append(this.state.tagsArray.join(''));

        console.log(ghostWorkField);

        let childs = ghostWorkField[0].children;

        $.each(childs, function(index) {

            if(this.className == 'black') {

                console.log(this);

                console.log($(this).position().top,$(this).position().left );

                let temp = $('<div/>', {
                    /*id: 'lb-' + id,*/
                    contentEditable: false,
                    css: {
                        position: 'absolute',
                        width: $(this).width() + 'px',
                        height: $(this).height() + 'px',
                        top:this.offsetTop + 'px',
                        left:this.offsetLeft + 'px'
                    }
                });

                let tag = $('<span/>', {
                    contentEditable: false,
                    class: 'black'
                });

                temp.append(tag);

                console.log(this.outerHTML);

                temp.on('click', function() {
                    $(this).children().toggleClass("red black");
                });

                document.getElementById('field').appendChild(temp[0]);
            }

        });
    }

    render() {
        return (
            <div>
                <div className="list work-field fake-field">{this.state.tagsArray}</div>
                <div className="list work-field" id="field" contentEditable="true" onInput={()=>this.handleTextChange} ></div>
            </div>
        )
    }

}

export default WorkField;