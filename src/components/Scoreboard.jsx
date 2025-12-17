// src/components/Scoreboard.jsx 

const Scoreboard = ({ currentScore, bestScore }) => {
    return (
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <p>Current Score: <span>{currentScore}</span></p>
        <p>Best Score: <span>{bestScore}</span></p>
      </div>
    );
  };
  
  export default Scoreboard;