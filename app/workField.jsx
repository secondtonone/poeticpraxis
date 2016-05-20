import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class WorkField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vowelArray: []
        };

        this.counterChar = 0;

        this.handleTextChange = this.handleTextChange.bind(this);
    }


    isVowel(char) {
        return /^[aeiouуеыаоэёяию]$/.test(char.toLowerCase());
    }

    isLetter(char) {
        return /^[a-zA-ZА-Яа-яёЁ]$/.test(char.toLowerCase());
    }


    handleTextChange(e) {

        let self = this;

        let ghostWorkField = $('.fake-field');

        console.log(e.target.innerText);

        e.preventDefault();

        var tagsArray = [];

        var children = e.target.innerText.split("");

        $.each(children, function(index) {

            console.log(this);


            if (self.isLetter(this)) {

                var id = ++self.counterChar;

                var temp = {};

                if (self.isVowel(this)) {

                    temp = $('<span/>', {
                        id: 'v-' + id,
                        class: 'black',
                        contentEditable: false
                    });

                    self.state.vowelArray.push('v-' + id);

                } else {

                    temp = $('<span/>', {
                        id: 'c-' + id,
                        class: 'regular',
                        contentEditable: false
                    });

                }

                tagsArray.push(temp.html(this)[0].outerHTML);

            } else {

                tagsArray.push(this);

            }

        });

        console.log(tagsArray.join(''));

        ghostWorkField.html('');


        ghostWorkField.append(tagsArray.join(''));

        console.log(ghostWorkField[0].children);

        $.each(ghostWorkField[0].children, function(index) {

            if(this.className == 'black') {

                console.log(this.offsetTop,this.offsetLeft);

                console.log($(this).position().top,$(this).position().left );

                var temp = $('<div/>', {
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

                this.innerHTML = '';

                temp[0].innerHTML = this.outerHTML;

                console.log(this.outerHTML);

                console.log(temp);

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

/*ReactDOM.render(<workField />, document.getElementById('work-field-container'));*/

export default WorkField;