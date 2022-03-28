import ReactDOM from 'react-dom';
import Game from './components/Game';
import Card from './components/Card';

const wrapper = document.querySelector('[data-game-wrapper]');

ReactDOM.render(
    /*(
        <Card>
            <div>Test</div>
            <div>Back</div>
        </Card>
    )*/ <Game />,
    wrapper
);