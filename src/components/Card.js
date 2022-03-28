import { Component } from "react";
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            visibleContent: <></>
        };
    }

    render() {
        console.log(this.props.children);
        // let [front, back] = this.props.children;
        // console.log(front);
        // console.log(back);

        const i = 10;
        return (
            <label>
                <input type="checkbox" />
                {/*<div className="card">
                    <div className="front">{back}</div>
                    <div className="back">s</div>
                </div>*/}
            </label>
        );
    }
}

export default Card;