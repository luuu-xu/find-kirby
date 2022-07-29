import '../styles/HomePage.css';
import GAMES from "../resources/data/GAMES";
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  return (
    <main className="home-page">
      <GameSelect />
      <LeaderboardBanner />
    </main>
  );
}

function GameSelect() {
  return (
    <div className="game-select">
      <h3 className="game-select-header">Select a level</h3>
      <GameSelectMain />
    </div>
  );
}

function GameSelectMain() {
  const games = GAMES;

  return (
    <div className="game-select-main">
      {Object.keys(games).map((key, index) => {
        return (
          <GameCard game={games[key]} key={index} />
        );
      })}
    </div>
  );
}

function GameCard({ game }) {
  let navigate = useNavigate();

  function handleClick(e) {
    const gameID = e.currentTarget.id;
    navigate(`/game/${gameID}`);
  }

  return (
    <div
      className="game-card"
      id={game.id}
      onClick={handleClick}
    >
      <GameCardPic url={game.url} alt={game.name} />
      <GameCardShow name={game.name} difficulty={game.difficulty} />
    </div>
  );
}

function GameCardPic({ url, alt }) {
  return (
    <img src={url} alt={alt} className="game-card-pic" />
  );
}

function GameCardShow({ name, difficulty }) {
  return (
    <div className="game-card-show">
      <p className="game-card-show-name">{name}</p>
      <p className="game-card-show-difficulty">{difficulty}</p>
    </div>
  );
}

function LeaderboardBanner() {
  return (
    <div className='leaderboard-banner'>
      <p>Check out the leaderboard!</p>
      <Link 
        to="/leaderboard/01"
        className='leaderboard-banner-link'
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default HomePage;