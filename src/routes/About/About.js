import React from 'react';
import Workfield from '../../components/Workfield';


export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {

        const text =`Духовной жаждою томим,\nВ пустыне мрачной я влачился,\nИ шестикрылый серафим\nНа перепутье мне явился...`;

        const stringsDictionary = `{"духовной жаждою томим,":{"accents":[{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":2},{},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{}]},"в пустыне мрачной я влачился,":{"accents":[{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":1},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{}]},"и шестикрылый серафим":{"accents":[{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0}]},"на перепутье мне явился...":{"accents":[{"type":0},{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":1},{},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{},{}]}}`;

        return (<div >
            <arcticle className="list list--animated list-about">
                <h1 className="text_title">POETIC PRAXIS?</h1>
                <p className="text_common">POETIC PRAXIS - это проект, созданный для поэтической практики и расширения границ творчества.</p>

                <h1 className="text_title">Прием монтажа</h1>
                <p className="text_common">Новые технологии дарят нам и новые возможности (инструменты). <a className="menu__item_active" href="/images-engine">МАШИНА ОБРАЗОВ</a> (когда-то изобретённая С. А. Есениным) позволяет из любого набора слов составлять случайные пары (или семьи, когда их три), получая неожиданные образы. Здесь она претерпела изменения. Что если попробовать получить новые сочетания не из простого набора слов (уже подготовленного), а какого-нибудь интересного текста, а может даже из стихотворения? А из нескольких? Вам стоит узнать, что из этого выйдет. Без бумаги и ножниц. Быстро и сколько угодно.</p>

                <p className="text_common">Работает она очень просто. Напишите слова или вставьте текст и нажмите на кнопку <button className="button_rounded button_transparent" type="button"><i className="material-icons material-icons--small">widgets</i></button>. После этого будут составлены сочетания слов из которых вы можете выбрать, подходящие вам (звучащие). Далее нажав на ту же кнопку можно сгенерировать новые сочетания, они заменят предыдущие, но выбранные вами останутся.</p>

                 <p className="text_common">Все выбранные сочетания можно перенести в <a className="menu__item_active" href="/rhythmic">РИТМИКУ</a>, нажимая на <button className="button_flat  button_transparent" type="button">Посмотреть ритм <i className="material-icons material-icons--small">arrow_forward</i>
                        </button>.</p>

                <h1 className="text_title">Ритм</h1>
                <p className="text_common">Многие читают стихи глазами, а не в слух. И некоторые из их числа никогда не задумывались о немаловажном аспекте как ритм стиха (если же конечно он есть в самом стихе). Исследуя стих на странице <a className="menu__item_active" href="/rhythmic">РИТМИКА</a>, можно его увидеть, например:</p>

                <div className="text-wrapper">
                    <Workfield text={text} readOnly={true}/>
                </div>

                <p className="text_common">Внимание! Редактор обозначает гласные буквы, но исследователь сам ставит ударения в словах, путём нажатия на саму букву:</p>

                  <div className="text-wrapper">
                    <Workfield text={text} stringsDictionary={stringsDictionary} readOnly={true}/>
                  </div>

                <p className="text_common">После этого происходит запоминание ударения, далее в уже знакомых словах он сам будет, обзаначать их (только на одном и том же устройстве). Так же можно ставить паузы кнопкой <button className="button_rounded button_transparent" type="button"><i className="material-icons material-icons--small">keyboard_capslock</i></button>.</p>

                <p className="text_common">Полученную ритмическую картину можно без проблем перенести в текстовый редактор (Google Docs, Microsoft Word и т.д.) кнопкой <button className="button_rounded button_transparent" type="button"><i className="material-icons material-icons--small">content_copy</i></button>.</p>

                <p className="text_common">Это всего лишь инструмент в познании. За вас он ничего не сделает, но поможет, "визуализируя размер".</p>

                <h1 className="text_title">И что дальше?</h1>
                <p className="text_common">К инструментам время от времени добавляются новые функции, которые открывают новые возможности. По вопросам и  предложениям можно связаться со мной по <a className="menu__item_active" href="mailto:secondtonone.secondtonone@gmail.com?subject=Poetic Praxis">почте</a> или в <a className="menu__item_active" href="https://vk.com/second_to_none">VK</a>.
                </p>

                <p className="text_footer">&copy; Кузнецов Макс А. Ю. 2017</p>
            </arcticle>
        </div>)
    }
}