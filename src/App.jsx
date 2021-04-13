import './App.css';
import Grid from './components/grid/grid.component';
import Snake from './components/snake/snake.component';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Snake</h1>
        <Grid/>
      </header>
    </div>
  );
}

export default App;
