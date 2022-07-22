import '../styles/GamePage.css';
import GAMES from '../resources/data/GAMES';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';

function GamePage() {
  let params = useParams();
  const game = GAMES[params.gameId];

  if (game) {
    return (
      <div className="game-page">
        <GamePageHeader game={game} />
        <GameMain game={game} />
      </div>
    );
  } else {
    return <NotFound/>;
  }
}

function GamePageHeader({ game }) {
  return (
    <div className='game-page-header'>
      <LegendMain targets={game.targets} />
      <Link to="/" className='game-page-header-home-link'>Home</Link>
    </div>
  )
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
  const [clickBoxIsOn, setClickIsBoxOn] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState([0, 0]);

  function getCoordinatesOnImage(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [Number(x.toFixed()), Number(y.toFixed())];
  };

  function handleClick(e) {
    if (!clickBoxIsOn) {
      const clickCoordinates = [e.clientX, e.clientY];
      setClickCoordinates(clickCoordinates);
      setClickIsBoxOn(true);
    } else {
      setClickIsBoxOn(false);
    }
  };

  return (
    <>
      <img 
        className="game-pic"
        src={game.url}
        alt={game.name}
        onClick={handleClick}
      />
      <ClickBox 
        targets={game.targets}
        clickBoxIsOn={clickBoxIsOn}
        clickCoordinates={clickCoordinates}
      />
    </>
  );
}

function ClickBox({ targets, clickBoxIsOn, clickCoordinates }) {
  const [x, y] = clickCoordinates;

  const coordinatesStyles = {
    zIndex: clickBoxIsOn ? 1 : -1,
    display: clickBoxIsOn ? 'flex' : 'none',
    left: x,
    top: y,
  };

  return (
    <div className="click-box" style={coordinatesStyles}>
      {targets.map((target) => {
        return (
          <ClickCard target={target} key={target.name} />
        );
      })}
    </div>
  );
}

function ClickCard({ target }) {
  return (
    <div className="click-card">
      <img 
        className="click-card-icon"
        src={target.url} 
        alt={target.name} 
      />
      <p className="click-card-name">
        {target.name}
      </p>
    </div>
  );
}

export default GamePage;