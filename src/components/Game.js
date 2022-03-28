import React, { Component } from "react";
import Board from "./Board";
import SideBar from "./SideBar";
import Modal from "./Modal"
import './Game.css'
import eventBus from "./EventBus";

function resetGame() {
    eventBus.dispatch('reset', {});
}

class Game extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="game-wrapper">
                    <div>
                        <div className="board">
                            <Board />
                        </div>
                        <button className="reset-button" onClick={resetGame}>Reset Game</button>
                    </div>
                    <SideBar />
                </div>
                <Modal />
            </React.Fragment>
        );
    }
}

export default Game;