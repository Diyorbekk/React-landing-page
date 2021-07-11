import React, {Component} from "react";

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    refreshPage = (e) => {
        e.preventDefault();
        window.location.reload(false);
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <button onClick={this.refreshPage()}>
                        Refresh Page
                    </button>
                </div>
            )
        }

        return this.props.children

    }
}

export default ErrorBoundary;
