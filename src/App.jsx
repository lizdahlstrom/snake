import './App.css';
import Grid from './components/grid/grid.component';
import Snake from './components/snake/snake.component';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='rainbow-text'>snake 🐍</h1>
        <Grid />
        <p>A sheep, a drum, and a snake fall off a cliff: Baa-dum-ssss</p>
      </header>
    </div>
  );
}

export default App;
