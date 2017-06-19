import React from 'react';

import Menu from '../Menu';


export default class Layout extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            imageEngine:{
                pinned: []
            },
            table:{}
        };
    }

    transmit = (newState) => {
        this.setState(newState);
    }

    render() {

        const transmit = this.transmit;

        const tableText = this.state.imageEngine.pinned;

        const childrenWithProps = React.Children.map(this.props.children,(child) => React.cloneElement(child, {
            transmit,
            tableText
        }));

        return (
            <div>
                <header>
                    <div className="logo-background">
                        <a href="/"><div className="logo"></div></a>
                    </div>
                    <Menu />
                </header>
                <div className="background"></div>
                <section className="main-content">
                {childrenWithProps}
                </section>
                <footer></footer>
            </div>
        )
    }
}