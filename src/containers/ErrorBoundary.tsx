import { h, Component } from 'preact';

import Langs from '@typings/Langs';
import MessageBox from '@components/MessageBox';

interface ErrorBoundaryProps { lang: Langs }

export default class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        console.warn(error);
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <MessageBox text={this.props.lang === 'ru' ?'Что-то пошло не так.' : 'Something went wrong.'} bottom={120} />;
        }

        return this.props.children;
    }
}
