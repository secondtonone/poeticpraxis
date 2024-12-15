import { Component } from 'preact';

import type { Langs } from '@typings/Langs';
import MessageBox from '@components/MessageBox';
import { messages } from '@translations';

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
      return <MessageBox text={messages[this.props.lang].SOMETHING_WRONG} bottom={120} />;
    }

    return this.props.children;
  }
}
