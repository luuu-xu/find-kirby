import "../styles/GamePage.css";
import GAMES from "../resources/data/GAMES";

function GamePage() {
  const game = GAMES['03'];

  return (
    <div className="game-page">
      <LegendMain targets={game.targets} />
      <GameMain game={game} />
      <ClickBox targets={game.targets} />
    </div>
  );
}

function LegendMain({ targets }) {
  return (
    <div className="legend-main">
      <p className="legend-main-title">Find the Kirby with: </p>
      {targets.map((target) => {
        return (
          <LegendCard target={target} key={target.name} />
        );
      })}
    </div>
  );
}

function LegendCard({ target }) {
  return (
    <div className="legend-card">
      <LegendIcon target={target} />
      <LegendName name={target.name} />
    </div>
  );
}

function LegendIcon({ target }) {
  return (
    <img 
      className="legend-icon"
      src={target.url}
      alt={target.name}
    />
  );
}

function LegendName({ name }) {
  return (
    <p className="legend-name">{name}</p>
  );
}

function GameMain({ game }) {
  return (
    <div className="game-main">
      <GamePic game={game} />
    </div>
  );
}

function GamePic({ game }) {
  return (
    <img 
      className="game-pic"
      src={game.url}
      alt={game.name} 
    />
  );
}

function ClickBox({ targets }) {
  return (
    <ul className="click-box">
      {targets.map((target) => {
        return (
          <ClickCard target={target} key={target.name} />
        );
      })}
    </ul>
  );
}

function ClickCard({ target }) {
  return (
    <li className="click-card">
      <img 
        className="click-card-icon"
        src={target.url} 
        alt={target.name} 
      />
      <p className="click-card-name">
        {target.name}
      </p>
    </li>
  );
}

export default GamePage;