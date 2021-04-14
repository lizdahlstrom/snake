import { useContext } from 'react';
import './App.css';
import Grid from './components/grid/grid.component';
import Snake from './components/snake/snake.component';
import { ScoreContext, ScoreProvider } from './contexts/score.context';

function App() {
  const [score, setScore] = useContext(ScoreContext);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='rainbow-text'>snake 🐍</h1>
        <Grid />
        <div className='lower-bar'>
          <span className='score'>Score: {score}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
