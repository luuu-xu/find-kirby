import '../styles/HomePage.css';
import GAMES from "../resources/data/GAMES";

function HomePage() {
  return (
    <main className="home-page">
      <GameSelect />
      <LeaderboardMain />
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
  return (
    <div className="game-select-main">
      {Object.keys(GAMES).map((key, index) => {
        return (
          <GameCard game={GAMES[key]} key={index} />
        );
      })}
    </div>
  );
}

function GameCard({ game }) {
  return (
    <div className="game-card">
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
  )
}

function LeaderboardMain() {
  return (
    <div>

    </div>
  )
}

export default HomePage;