import React from 'react';
import NotFoundPage from '../pages/NotFoundPage';

class ErrorCatcher extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) return <NotFoundPage />;
    return this.props.children;
  }
}

export default ErrorCatcher;
