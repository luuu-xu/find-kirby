import '../styles/GamePage.css';
import GAMES from '../resources/data/GAMES';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { dbAddGame, dbGetGame } from '../firebase/firebase';

function GamePage() {
  let params = useParams();
  const game = GAMES[params.gameId];

  const [targetsFound, setTargetsFound] = useState([false, false, false]);

  function handleTargetFound(index) {
    const newTargetsFound = targetsFound.map((e, i) => {
      if (i === index) {
        return true;
      } else {
        return e;
      }
    });
    setTargetsFound(newTargetsFound);
  }

  if (game) {

    // Add game data to firestore.
    // dbAddGame(game);

    return (
      <div className="game-page">
        <GamePageHeader game={game} targetsFound={targetsFound} />
        <GameMain game={game} targetsFound={targetsFound} handleTargetFound={handleTargetFound} />
      </div>
    );
  } else {
    return <NotFound/>;
  }
}

function GamePageHeader({ game, targetsFound }) {
  return (
    <div className='game-page-header'>
      <LegendMain targets={game.targets} targetsFound={targetsFound} />
      <Link to="/" className='game-page-header-home-link'>Home</Link>
    </div>
  )
}

function LegendMain({ targets, targetsFound }) {
  return (
    <div className="legend-main">
      <p className="legend-main-title">Find the Kirby with: </p>
      {targets.map((target, i) => {
        return (
          <LegendCard 
            target={target} 
            key={target.name} 
            found={targetsFound[i]} 
          />
        );
      })}
    </div>
  );
}

function LegendCard({ target, found }) {
  const classes = `legend-card ${found ? 'found' : ''}`;

  return (
    <div className={classes}>
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

function GameMain(props) {
  return (
    <div className="game-main">
      <GamePic {...props} />
    </div>
  );
}

function GamePic({ game, targetsFound, handleTargetFound }) {
  const [clickBoxIsOn, setClickIsBoxOn] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState([0, 0]);
  const [coordinatesInPercentileOnImage, setCoordinatesInPercentileOnImage] = useState([0, 0]);

  function isClickedCoordinatesInside(coordinatesInPercentileOnImage, dbClickedTarget, dbGameSize) {
    const dbCoor = dbClickedTarget.coordinate;
    const dbBox = dbClickedTarget.boxSize;

    return coordinatesInPercentileOnImage.every((coor, i) => {
      return (
        coor >= Number((dbCoor[i] / dbGameSize[i]).toFixed(3))
        && 
        coor <= Number(((dbCoor[i] + dbBox[i]) / dbGameSize[i]).toFixed(3))
      );
    });
  }

  function getCoordinatesInPercentileOnImage(e) {
    const rect = e.target.getBoundingClientRect();
    const imageWidth = rect.right - rect.left;
    const imageHeight = rect.bottom - rect.top;
    const clickedX = e.clientX - rect.left;
    const clickedY = e.clientY - rect.top;
    const clickedXInPercentile = Number((clickedX / imageWidth).toFixed(3));
    const clickedYInPercentile = Number((clickedY / imageHeight).toFixed(3));
    return [clickedXInPercentile, clickedYInPercentile];
  }

  function handleGameClick(e) {
    if (!clickBoxIsOn) {
      const clickCoordinates = [e.clientX, e.clientY];
      setClickCoordinates(clickCoordinates);
      const coordinatesInPercentileOnImage = getCoordinatesInPercentileOnImage(e);
      setCoordinatesInPercentileOnImage(coordinatesInPercentileOnImage);
      setClickIsBoxOn(true);
    } else {
      setClickIsBoxOn(false);
    }
  }

  async function handleCardClick(e) {
    const clickedCardName = e.currentTarget.id;
    const dbGame = await dbGetGame(game);
    const dbGameSize = dbGame.size;
    const dbTargets = dbGame.targets;
    const dbClickedTargetIndex = await dbTargets.findIndex((target) => target.name === clickedCardName);
    const dbClickedTarget = dbTargets[dbClickedTargetIndex];
    const result = await isClickedCoordinatesInside(coordinatesInPercentileOnImage, dbClickedTarget, dbGameSize);
    // console.log(result);

    if (result) {
      handleTargetFound(dbClickedTargetIndex);
    }

    setClickIsBoxOn(false);
  }

  return (
    <>
      <img 
        className="game-pic"
        src={game.url}
        alt={game.name}
        onClick={handleGameClick}
      />
      <ClickBox 
        targets={game.targets}
        clickBoxIsOn={clickBoxIsOn}
        clickCoordinates={clickCoordinates}
        targetsFound={targetsFound}
        handleCardClick={handleCardClick}
      />
    </>
  );
}

function ClickBox({ targets, clickBoxIsOn, clickCoordinates, targetsFound, handleCardClick }) {
  const [x, y] = clickCoordinates;

  const coordinatesStyles = {
    zIndex: clickBoxIsOn ? 1 : -1,
    display: clickBoxIsOn ? 'flex' : 'none',
    left: x,
    top: y,
  };

  return (
    <div className="click-box" style={coordinatesStyles}>
      {targets.map((target, i) => {
        return (
          <ClickCard 
            target={target}
            key={target.name}
            found={targetsFound[i]}
            handleCardClick={handleCardClick}
          />
        );
      })}
    </div>
  );
}

function ClickCard({ target, found, handleCardClick }) {
  const classes = `click-card ${found ? 'found' : ''}`;

  return (
    <div 
      className={classes} 
      id={target.name}
      onClick={handleCardClick}
    >
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