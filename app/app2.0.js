var workFieldModel = [];
var counterChar = 0;
var counterLine = 0;
var vowelArray = [];
var ghostWorkField = $('.fake-field');
//иницилизация
function init() {
    $('.work-field')[0].focus();
}


function caretPlace(el) {

    var lastElement = '';

    el.focus();

    if (window.getSelection) {

        var sel = window.getSelection();
        //создаем range размером с контейнер
        range.selectNodeContents(el);
        range.collapse(false);
        //создаем выделение
        sel.removeAllRanges();
        sel.addRange(range);


        //элемент после каретки
        lastElement = sel.anchorNode.parentElement.id;

        console.log(lastElement);

    } else if (document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
        lastElement = textRange.parentElement.id;
    }

    console.log(lastElement);

    return lastElement;
}
//ставим каретку в конец строки
function placeCaretAtEnd(el) {

    var lastElement = '';

    el.focus();

    if (window.getSelection && document.createRange) {
        var range = document.createRange();
        var sel = window.getSelection();
        //создаем range размером с контейнер
        range.selectNodeContents(el);
        range.collapse(false);
        //создаем выделение
        sel.removeAllRanges();
        sel.addRange(range);

        console.log(sel);
        console.log(range);


    } else if (document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
        lastElement = textRange.parentElement.id;
    }
}
//генерируем шаблон для символа
function generateTemp(code, node) {

    var id = ++counterChar;

    var temp = {};
    var fakeTemp = {};
    var char = '';

    if (code === 13) {
        temp = $('<span/>', {
            id: 'lb-' + id,
            class: 'break'
        });

        fakeTemp = $('<div/>');

        fakeTemp.append(temp);
        fakeTemp.append('&zwnj;');

        temp = fakeTemp.html();

    } else if (code === 32) {
        temp = $('<span/>', {
            id: 'sp-' + id,
            class: 'space'
        });

        temp.html('&nbsp;');

    } else {

        char = getChar(code);

        if (isVowel(char)) {
            //vowel-гласная
            temp = $('<span/>', {
                id: 'v-' + id,
                class: 'black'
            });

            temp.on('click', function() {
                $(this).toggleClass("red black");
            });
        } else {
            //consonantal-согласная
            temp = $('<span/>', {
                id: 'c-' + id,
                class: 'regular'
            });
        }

        temp.html(char);
    }

    return temp;
}
//определние гласных
function isVowel(char) {
    return /^[aeiouуеыаоэёяию]$/.test(char.toLowerCase());
}

function isLetter(char) {
    return /^[a-zA-ZА-Яа-яёЁ]$/.test(char.toLowerCase());
}
//код символа превращаем в букву
//32 - пробел, 13 - enter
function getChar(code) {
    var char = String.fromCharCode(code);
    return char;
}
//для delete клавиши,  press не ловит
//удаляет br-теги
/*$('.work-field').on('keyup', function(e) {
   if (e.keyCode == 8 || e.keyCode == 46) {

      $('.work-field').find('br').remove();
      placeCaretAtEnd($('.work-field')[0]);
      if($.browser.mozilla) {
         var lastEl = placeCaretAtEnd($('.work-field')[0]);
         $('#'+lastEl).remove();
      }
   }
});*/
//главный обработчик клавиш
/*$('.work-field').on('keypress', function(e) {
   //отменяем стандартное поведение

   e.preventDefault();
   if (e.keyCode !== 8) {

      var content = $('.work-field').html();

      var temp = generateTemp(e.charCode);

      $('.work-field').append(temp);

      placeCaretAtEnd($('.work-field')[0]);
   }


});*/

$('.work-field').on('click', function(e) {
    $('.work-field')[0].focus();
});


$('.work-field').on('input', function(e) {

    console.log(e.target.innerText);

    e.preventDefault();

    var tagsArray = [];

    var children = e.target.innerText.split("");

    $.each(children, function(index) {

        console.log(this);


        if (isLetter(this)) {

            var id = ++counterChar;

            var temp = {};

            var div = $('<div/>');


            if (isVowel(this)) {

                temp = $('<span/>', {
                    id: 'v-' + id,
                    class: 'black',
                    contentEditable: false
                });

                vowelArray.push('v-' + id);

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


            var temp = $('<div/>', {
                /*id: 'lb-' + id,*/
                contentEditable: false,
                css: {
                    position: 'absolute',
                    width: $(this).width() + 'px',
                    height: $(this).height() + 'px',
                    top:$(this).position().top + 'px',
                    left:$(this).position().left + 'px'
                }
            });

            this.innerHTML = '';

            temp.html(this.outerHTML);

            console.log(this.outerHTML);

            console.log(temp);

            $('.work-field').append(temp);
        }

    });

});

setTimeout(init, 7000);
