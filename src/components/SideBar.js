import { Component } from "react";
import eventBus from "./EventBus";
import Moves from "./Moves";

class SideBar extends Component {

    constructor() {
        super();

        this.state = {
            currentPlayer: 'X'
        };
    }

    componentDidMount() {
        eventBus.on('playerSwitch', (data) => {
            this.setState({ currentPlayer: data.newPlayer })
        });
    }

    componentWillUnmount() {
        eventBus.remove("playerSwitch");
    }

    render() {
        return (
            <div>
                <h1 style={{ fontSize: '4rem' }}>
                    Tic Tac Toe
                </h1>
                <div>
                    Experience this take on the classic children's game :)
                </div>
                <div className="status">Next Player: { this.state.currentPlayer }</div>
                <Moves />
            </div>
        );
    }

}

export default SideBar;