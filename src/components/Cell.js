import { Component } from 'react';
import './Cell.css'
import { currentPlayer, iterations, getWinner, grid, isGameOver, canClick } from './Board'
import eventBus from './EventBus';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    onClick = (index) => {
        if (canClick(index - 1)) {
            const oldPlayer = currentPlayer;
            grid[index - 1] = currentPlayer;
            this.props.handlePlayerSwitch(currentPlayer);
            eventBus.dispatch('playerSwitch', { 
                newPlayer: currentPlayer, 
                move: {
                    stepNumber: iterations, 
                    turnSymbol: oldPlayer
                }
            });

            if (isGameOver()) {
                eventBus.dispatch('gameOver', { modalVisible: true, winner: getWinner(grid) });
            }

            this.forceUpdate();
        }
    }

    render() {
        return (
            <button className='square' onClick={() => this.onClick(this.props.value)} onMouseDown={this.mouseToggle} onMouseUp={this.mouseToggle}>
                {grid[this.props.value - 1]}
            </button>
        );
    }
}

export default Cell;