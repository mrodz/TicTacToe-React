import { Component } from "react";
import "./CloseButton.css";

class CloseButton extends Component {
    render() {
        return <span className="close-button" onClick={this.props.onClose}>&times;</span>
    }
}

export default CloseButton;