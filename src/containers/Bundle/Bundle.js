import { h, Component } from 'preact';
class Bundle extends Component {
    state = {
        component: null
    };

    async componentDidMount() {
        const component = await this.props.load();
        
        this.setState({
            component: component.default ? component.default : component
        });
    }

    render() {
        return this.props.children(this.state.component);
    }
}

export default Bundle;
