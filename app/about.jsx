import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <div className="lists">
                <div className="list">
                    <p className="text_common">Смысл в том, что когда ты пишешь слово, например:</p>
                      <div className="text-wrapper">п<span className="black">о</span><span className="black">э</span>з<span className="black">и</span><span className="black">я</span></div>
                      <p className="text_common">Здесь выделяются только гласные буквы. После этого ты можешь сам выделить ударение, нажав на саму букву:</p>
                      <div className="text-wrapper">п<span className="black">о</span><span className="red">э</span>з<span className="black">и</span><span className="black">я</span></div>

                   <p className="text_common">Для чего это? </p>
                   <p className="text_common">С помощью этого ты можешь анлизировать стихи, "визуализируя размер".</p>
                   <p className="text_common text_attention">Редактор находится в разработке и ещё не полностью функционирует.</p>
                </div>
            </div>
        )
    }
}