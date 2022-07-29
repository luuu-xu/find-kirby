import "../styles/Leaderboard.css";
import GAMES from "../resources/data/GAMES";
import { dbGetGameScores } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function LeaderboardPage() {
  return (
    <div className="leaderboard-page">
      <LeaderboardHeader />
      <LeaderboardMain />
    </div>
  );
}

function LeaderboardHeader() {
  return (
    <div className="leaderboard-header">
      <h3 className="leaderboard-h3">Leaderboard</h3>
      <Link to="/" className='leaderboard-header-home-link'>Home</Link> 
    </div>
  );
}

function LeaderboardMain() {
  const games = GAMES;

  let params = useParams();
  
  // Change to game leaderboard with useState.
  const [gameID, setGameID] = useState(params.gameID || '01');
  function handleClick(e) {
    const gameID = e.currentTarget.id;
    setGameID(gameID);
  }

  return (
    <div className="leaderboard-main">
      <LeaderboardGameSelect 
        games={games}
        handleClick={handleClick}
        gameID={gameID}
      />
      <LeaderboardTable gameID={gameID} />
    </div>
  );
}

function LeaderboardGameSelect({ games, handleClick, gameID }) {
  return (
    <div className="leaderboard-game-select">
      {Object.keys(games).map((key, index) => {
        return (
          <GameCard 
            game={games[key]}
            key={index}
            handleClick={handleClick}
            gameID={gameID}
          />
        );
      })}
    </div>
  );
}

function GameCard({ game, handleClick, gameID }) {
  const classNames = `game-card ${game.id === gameID ? 'selected' : ''}`;
  
  return (
    <div className={classNames} id={game.id} onClick={handleClick}>
      <GameCardPic url={game.url} alt={game.name} />
      <GameCardShow game={game} gameID={gameID} />
    </div>
  );
}

function GameCardPic({ url, alt }) {
  return (
    <img src={url} alt={alt} className="game-card-pic" />
  );
}

function GameCardShow({ game, gameID }) {
  return (
    <div className="game-card-show">
      {/* <p>{game.name}</p> */}
      {game.id === gameID 
      ? 
      <Link to={`/game/${gameID}`} className="game-card-show-link">Play</Link> 
      : 
      <p>{game.name}</p>
      }
    </div>
  );
}

function LeaderboardTable({ gameID }) {
  const [scores, setScores] = useState();

  useEffect(() => {
    async function getScores(gameID) {
      const dbScores = await dbGetGameScores(gameID);
      const newScores = [];
      dbScores.forEach((doc) => {
        const data = doc.data();
        const event = new Date(data.timeStamp.seconds * 1000);
        const UTCDate = event.toUTCString().slice(4, 16);
        newScores.push({
          id: doc.id,
          UTCDate: UTCDate,
          ...data,
        });
      });
      setScores(newScores);
    }
    getScores(gameID);
  }, [gameID]);

  if (scores) {
    return (
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Username</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => {
            return (
              <ScoreRow 
                time={score.time}
                userName={score.userName} 
                UTCDate={score.UTCDate} 
                key={score.id}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

function ScoreRow({ time, userName, UTCDate }) {
  return (
    <tr>
      <td>{time.toFixed(2)}</td>
      <td>{userName}</td>
      <td>{UTCDate}</td>
    </tr>
  );
}

export default LeaderboardPage;