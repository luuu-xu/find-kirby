import '../styles/GamePage.css';
import GAMES from '../resources/data/GAMES';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { dbAddGame, dbAddUserScore, dbGetGame } from '../firebase/firebase';

function GamePage() {
  // Get game data with useParams from react-router-dom.
  let params = useParams();
  const game = GAMES[params.gameId];

  // Stopwatch feature with useEffect.
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => Number((prevTime + 0.01).toFixed(2)));
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Keeps track of targets found statuses of targets with useState.
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

  // Determines whether ModalBox should appear with useState.
  const [modalOn, setModalOn] = useState(false);

  if (game) {
    // Add game data to firestore.
    // dbAddGame(game);

    // When all targets have been found.
    if (targetsFound.every(e => e === true) && running) {
      setRunning(false);
      setModalOn(true);
    }

    return (
      <div className="game-page">
        <GamePageHeader game={game} targetsFound={targetsFound} />
        <GameMain game={game} targetsFound={targetsFound} handleTargetFound={handleTargetFound} />
        <ModalBox modalOn={modalOn} time={time} game={game} />
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

  // Check locally if the target is correctly clicked.
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

  // Calculate and return the clicked coordinates on image based on percentile.
  function getCoordinatesInPercentileOnImage(e) {
    const rect = e.target.getBoundingClientRect();
    const imageWidth = rect.right - rect.left;
    const imageHeight = rect.bottom - rect.top;
    // console.log("image dimensions: ", imageWidth, imageHeight);
    const clickedX = e.clientX - rect.left;
    const clickedY = e.clientY - rect.top;
    // console.log("clicked coors: ", clickedX, clickedY);
    const clickedXInPercentile = Number((clickedX / imageWidth).toFixed(3));
    const clickedYInPercentile = Number((clickedY / imageHeight).toFixed(3));
    // console.log("clicked coor in percent: ", clickedXInPercentile, clickedYInPercentile);
    return [clickedXInPercentile, clickedYInPercentile];
  }

  // Clicking anywhere on the game image sets two relevant sates.
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

  // Choosing one of the target cards does: 
  // calls dbGetGame so it gets this game's targets data from Firestore, 
  // calls isClickedCoordinatesInside to determine whether the target is hit,
  // and updates the target found finally.
  async function handleCardClick(e) {
    const clickedCardName = e.currentTarget.id;
    const dbGame = await dbGetGame(game);
    const dbGameSize = dbGame.size;
    const dbTargets = dbGame.targets;
    const dbClickedTargetIndex = 
      await dbTargets.findIndex((target) => target.name === clickedCardName);
    const dbClickedTarget = dbTargets[dbClickedTargetIndex];
    const result = 
      await isClickedCoordinatesInside(coordinatesInPercentileOnImage, dbClickedTarget, dbGameSize);

    console.log(result);
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

function ModalBox({ modalOn, time, game }) {
  // Clicking on Cancel button navigates back to home page.
  let navigate = useNavigate();

  function handleCancel() {
    navigate("/");
  }

  // Clicking Submit button calls dbAddUserScore that uploads score to Firestore,
  // and navigate to the corresponding leaderboard.
  async function handleSubmit(e) {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const gameID = game.id;
    await dbAddUserScore(userName, time, gameID);
    navigate(`/leaderboard/${gameID}`);
  }
  
  if (modalOn) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            You found them in <span className="pink">{time}</span> seconds!
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="userName">
              Enter your name to be on the leaderboard: 
              <input id="userName" type="text" name="userName" required autoComplete="name" autoFocus/>
            </label>
            <div className="modal-form-btns">
              <button 
                className="modal-btn-cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="modal-btn-submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );  
  }
}

export default GamePage;