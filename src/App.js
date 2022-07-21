import GamePage from './components/GamePage';
import Header from './components/Header';
import HomePage from './components/HomePage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <HomePage /> */}
      <GamePage />
    </div>
  );
}

export default App;
