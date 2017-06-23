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
                <p className="text_common">POETIC PRAXIS - это проект, созданный для поэтической практики и расширения границ творчества.</p>

                <p className="text_common">Новые технологии дарят нам и новые возможности и инструменты. <a className="menu__item_active" href="/images-engine">МАШИНА ОБРАЗОВ</a> (когда-то изобретённая С. А. Есениным) позволяет из любого набора слов составлять случайные пары, получая неожиданные образы. Здесь она претерпела изменения. Что если попробовать получить новые сочетания не из простого набора слов, а какого-нибудь интересного текста, а может даже из стихотворения? А из нескольких? Вам стоит узнать, что из этого выйдет. Быстро и сколько угодно.</p>

                <p className="text_common">Работает она очень просто. Напишите слова или вставьте текст и нажмите на кнопку <button className="button_rounded button_transparent" type="button"><i className="material-icons material-icons--small">widgets</i></button>. После этого будут составлены сочетания слов из которых вы можете выбрать, подходящие вам (звучащие). Далее нажав на ту же кнопку можно сгенерировать новые сочетания, они заменят предыдущие, но уже выбранные останутся.</p>

                 <p className="text_common">Все выбранные сочетания можно перенести в <a className="menu__item_active" href="/rhythmic">РИТМИКУ</a>, нажава на <button className="button_flat  button_transparent" type="button">Посмотреть ритм <i className="material-icons material-icons--small">arrow_forward</i>
                        </button>.</p>

                <p className="text_common">Многие читают стихи глазами, а не в слух. И некторые из их числа никогда не задумывались о немаловажном аспекте как ритм стиха. Или из-за неправильного чтения просто его не улавливали. Редактор на странице <a className="menu__item_active" href="/rhythmic">РИТМИКА</a> поможет его увидеть (а потом при желании и услышать), например:</p>

                <div className="text-wrapper">
                    <Workfield text={text} readOnly={true}/>
                </div>

                <p className="text_common">Внимание! Редактор обозначает гласные буквы, но исследователь сам ставит ударения в словах, нажав на саму букву:</p>

                  <div className="text-wrapper">
                    <Workfield text={text} stringsDictionary={stringsDictionary} readOnly={true}/>
                  </div>

                <p className="text_common">Это всего лишь инструмент в познании. За вас он ничего не сделает, но зато научит. Главное - это практика. Исследователи поэзии смогут анализировать стихи, "визуализируя размер".</p>

                <p className="text_common text_attention">Проект проходит тестирование. По вопросам и  предложениям можно связаться со мной <a className="menu__item_active" href="mailto:secondtonone.secondtonone@gmail.com">по почте</a>.
                </p>
            </arcticle>
        </div>)
    }
}