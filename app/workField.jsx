import React from 'react';
import $ from 'jquery';
/*
    добавление букв можно написать через react, ровно как и тэгов
*/

class Letter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<span className="{this.props.class}" contentEditable="true" id="{this.props.id}">{this.props.letter}</span>);
    }
}


class WorkField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vowelArray: [],
            string:{}
        };

        this.counterChar = 0;

        this.handleTextChange = this.handleTextChange.bind(this);
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

        var tagsArray = [];

        var children = e.target.innerText.split("");

        $.each(children, function(index) {

            let symbol = this;

            let temp = $('<span/>', {
                    contentEditable: false
                });

            if (self.isLetter(symbol)) {

                let id = ++self.counterChar;



                if (self.isVowel(symbol)) {

                    id = 'v-' + id;

                    temp.addClass('black').attr('id','v-' + id);

                    /*tagsArray.push(<Letter class={'black'} id={id} letter={symbol} />);*/

                    self.state.vowelArray.push('v-' + id);

                } else {

                    temp.addClass('regular').attr('id','c-' + id);

                }

            }

            if (self.isBreakLine(symbol)) {
                temp = $('<div/>', {
                    contentEditable: false
                });
            }

            temp[0].innerHTML = symbol;

            symbol = temp[0].outerHTML;


            tagsArray.push(symbol);


        });

        console.log(tagsArray);

        ghostWorkField[0].innerHTML = '';

        ghostWorkField.append(tagsArray.join(''));

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
                <div className="list work-field fake-field"></div>
                <div className="list work-field" id="field" contentEditable="true" onInput={this.handleTextChange} ></div>
            </div>
        )
    }

}

export default WorkField;