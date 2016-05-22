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

        const self = this;

        let ghostWorkField = $('.fake-field');

        console.log(e.target.innerText);

        e.preventDefault();

        var tagsArray = [];

        var children = e.target.innerText.split("");

        $.each(children, function(index) {

            console.log(this);

            if (self.isLetter(this)) {

                let id = ++self.counterChar;

                let temp = $('<span/>', {
                    contentEditable: false
                });

                if (self.isVowel(this)) {

                    temp.addClass('black').attr('id','v-' + id);

                    self.state.vowelArray.push('v-' + id);

                } else {

                    temp.addClass('regular').attr('id','c-' + id);

                }

                tagsArray.push(temp.html(this)[0].outerHTML);

            } else {

                tagsArray.push(this);

            }

        });

        ghostWorkField.html('');


        ghostWorkField.append(tagsArray.join(''));

        console.log(ghostWorkField);

        let childs = ghostWorkField[0].childNodes;

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