import React, { Component } from "react";
import Cell from './Cell'
import eventBus from "./EventBus";

const players = ['X', 'O']

var currentPlayer = players[0];
var iterations = 1;
var grid = Array(9);

function initializeGrid() {
    for (let i = 0; i < grid.length; i++) {
        grid[i] = ' ';
    }
}

initializeGrid();

function calculateNextPlayer(symbol) {
    if (symbol.toUpperCase() === 'X') return 'O';
    if (symbol.toUpperCase() === 'O') return 'X';
    throw Error(`invalid symbol: ${symbol}`);
}

testWinner();

/**
 * Unit test to see if the game is able to properly identify winners. 
 */
function testWinner() {
    const toGrid = (str) => {
        let result = [];
        for (let i = 0; i < str.length; i++) {
            let char = str.charAt(i);
            result.push(char === '_' ? ' ' : char);
        }
        return result;
    }

    const grids = [
        'XXX______',
        '_X__X__X_',
        'O___O___O',
        '__X_OO_X_',
        'XXOXOXOX_',
        'XXXXOOOOX',
        'XOXXOOOXO'
    ];

    for (const grid of grids) {
        console.log(`grid: [${grid}] -> winner: ${getWinner(toGrid(grid))}`);
    }
}

function canClick(index) {
    return !players.includes(grid[index]) && !isGameOver();
}

/**
 * Is the game over
 * @returns {boolean} whether the game is over.
 */
function isGameOver() {
    return getWinner() !== false;
}

/**
 * Get the winner of the game.
 * @returns {(string|boolean)} the winning symbol if the game has a winner; true if the game is a tie, otherwise false.
 */
function getWinner(g = grid) {  
    for (let i = 0; i < 3; i++) {
        const o = i * 3; // offset
        const centralX = g[o + 1];
        const centralY = g[3 + i];

        if (g[o + 0] === centralX && centralX === g[o + 2] && ['X', 'O'].includes(centralX)) return centralX;
        if (g[0 + i] === centralY && centralY === g[6 + i] && ['X', 'O'].includes(centralY)) return centralY;
    }

    const center = grid[4];
    if (['X', 'O'].includes(center)) {
        if (g[0] === center && center === g[8]) return center;
        if (g[2] === center && center === g[6]) return center;
    }

    return !g.includes(' ');
}

/**
 * ReactJS component to represent the board (playable area)
 */
class Board extends Component {
    constructor() {
        super();
        this.state = {
            currentPlayer: 'X'
        }
    }

    // https://www.pluralsight.com/guides/how-to-communicate-between-independent-components-in-reactjs
    handlePlayerSwitch = (player) => {
        var newSymbol = calculateNextPlayer(player);
        currentPlayer = newSymbol;

        this.setCurrentPlayer(newSymbol);

        this.forceUpdate();
    }

    setCurrentPlayer = (symbol) => {
        this.setState({ currentPlayer: symbol });
    }

    renderCell(i) {
        return <Cell value={i} handlePlayerSwitch={this.handlePlayerSwitch} />
    }

    componentDidMount() {
        eventBus.on('playerSwitch', data => iterations++);
        eventBus.on('reset', data => {
            initializeGrid();
            iterations = 1;
            currentPlayer = players[0];

            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        eventBus.remove('playerSwitch');
        eventBus.remove('reset');
    }

    render() {
        return (
            <React.Fragment>
                <div className="board-row">
                    {this.renderCell(1)}
                    {this.renderCell(2)}
                    {this.renderCell(3)}
                </div>
                <div className="board-row">
                    {this.renderCell(4)}
                    {this.renderCell(5)}
                    {this.renderCell(6)}
                </div>
                <div className="board-row">
                    {this.renderCell(7)}
                    {this.renderCell(8)}
                    {this.renderCell(9)}
                </div>
            </React.Fragment>
        );
    }
}

export default Board;
export { currentPlayer, iterations, grid, isGameOver, getWinner, canClick };