import React, { Component } from "react";
import Card from "./Card";
import eventBus from "./EventBus";
import './Moves.css'


function getCircleRGB() {
    return [
        Math.floor(Math.random() * 256), 
        Math.floor(Math.random() * 256), 
        Math.floor(Math.random() * 256)
    ];
}

function rgbToHex(r, g, b) {
    return `#${padZero(r.toString(16))}${padZero(g.toString(16))}${padZero(b.toString(16))}`;
} 

function padZero(hex) {
    if (hex.length === 2) return hex;
    return '0' + hex;
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color -> ' + hex);
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }

    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

class Moves extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moves: []
        };

        console.log(this.state);
    }

    componentDidMount() {
        eventBus.on('playerSwitch', data => {
            let temp = this.state?.moves;
            let [r, g, b] = getCircleRGB();
            let hex = rgbToHex(r, g, b);
            data.move.colors = {
                bg: hex,
                contrast: invertColor(hex),
                font: invertColor(hex, true)
            };
            temp.push(data.move);
            this.setState({ moves: temp }, () => console.log(this.state));
        });
        eventBus.on('reset', data => {
            this.setState({ moves: [] });
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        eventBus.remove('playerSwitch');
        eventBus.remove('reset');
    }

    createCard(move) {
        const style = {
            backgroundColor: move.colors.bg,
            border: `solid ${move.colors.contrast} .2rem`,
            color: move.colors.font
        };
        return (
            <div className="move-card">
                <div>
                    <div className="move-card-bubble" style={style}>
                        <div style={{transform: 'translate(0, 70%)'}}>
                            #{move.stepNumber}
                        </div>
                    </div>
                    <div style={{transform: 'translate(0, 25%)'}}>move by {move.turnSymbol}</div>
                </div>
            </div>
        );
    }

    render() {
        let cards = [];

        for (const move of this.state.moves) {
            cards.push(/*<Card>{*/this.createCard(move)/*}</Card>*/);
        }

        return (
            <div className="move-cards">
                {cards}
            </div>
        );
    }
}

export default Moves;