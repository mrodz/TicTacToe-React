import React, { Component } from 'react';
import eventBus from './EventBus';
import CloseButton from './CloseButton';
import './Modal.css'

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dialog: ''
        };
    }

    componentDidMount() {
        eventBus.on('gameOver', (data) => {
            this.setState({ visible: data.modalVisible, dialog: data.winner })
        });
    }

    componentWillUnmount() {
        eventBus.remove("gameOver");
    }

    onClose = () => {
        this.setState({ visible: false, winner: this.state.winner });
        this.forceUpdate();
    }

    render() {
        return (
            <React.Fragment>
                <div className={'blanket ' + (!this.state.visible ? 'modal-hide' : 'blanket-see')}></div>
                <div className='modal-wrapper'>
                    <div className={'modal ' + (!this.state.visible ? 'modal-hide' : 'modal-see')}>
                        <CloseButton onClose={this.onClose} />
                        <h1>Game Over!</h1>
                        <div>
                            {this.state.dialog === true ? 'It is a tie...' : `${this.state.dialog} Wins!`}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Modal;