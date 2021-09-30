import { h, Component } from 'preact';
import { RouteComponentProps } from 'react-router-dom';
import ComponentType from '@typings/ComponentDefault';

type ComponentDefault = ComponentType<RouteComponentProps>;

interface BundleProps { 
    load: () => Promise<ComponentDefault>
    children: (component: ComponentDefault['default']) => JSX.Element
}

interface BundleState { 
    component: ComponentDefault['default'] | null;
}

class Bundle extends Component<BundleProps, BundleState> {
    state: BundleState = {
        component: null
    };

    async componentDidMount() {
        const component = await this.props.load();
        
        this.setState({
            component: component.default
        });
    }

    render() {
        return this.props.children(this.state.component);
    }
}

export default Bundle;
