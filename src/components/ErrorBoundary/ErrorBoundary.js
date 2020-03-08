import { h, Component } from 'preact';

import MessageBox from '../MessageBox';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <MessageBox text={'Что-то пошло не так.'} bottom={120} />;
        }

        return this.props.children;
    }
}
