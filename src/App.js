import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './App.css';

const images = [
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png'
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [pairsCount, setPairsCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [showingAll, setShowingAll] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledTiles = shuffleArray(images);
    setTiles(shuffledTiles);
    setFlippedTiles([]);
    setMatchedPairs([]);
    setPairsCount(0);
    setMistakesCount(0);
    setGameOver(false);
    setShowingAll(true);

    const timer = setTimeout(() => {
      setShowingAll(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const handleTileClick = (index) => {
    if (gameOver || flippedTiles.length === 2 || flippedTiles.includes(index) || matchedPairs.includes(index) || showingAll) {
      return;
    }

    const newFlippedTiles = [...flippedTiles, index];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        setPairsCount(pairsCount + 1);
      } else {
        setMistakesCount(mistakesCount + 1);
        if (mistakesCount === 2) {
          setGameOver(true);
        }
      }

      setTimeout(() => {
        setFlippedTiles([]);
        if (pairsCount === 11) {
          setGameOver(true); // All pairs are matched
        }
      }, 1000);
    }
  };

  const getStars = () => {
    if (pairsCount >= 8) return 3; // Assuming 12 is the maximum pairs for 3 stars
    if (pairsCount >= 6) return 2;
    if (pairsCount >= 3) return 1;
    return 0;
  };

  const getPointsX = () => mistakesCount;

  return (
    <div className="App">
      <div className="score-board">
        <p className="pairs">{pairsCount}</p>
        <div className="stars">
          {[...Array(3).keys()].map(i => (
            <div key={i} className={`star ${getStars() > i ? 'active' : ''}`}></div>
          ))}
        </div>
        <div className="black-stars">
          {[...Array(3).keys()].map(i => (
            <div key={i} className="black-star"></div>
          ))}
        </div>
        <div className="pointsX">
          {[...Array(3).keys()].map(i => (
            <div key={i} className="black-pointX"></div>
          ))}
        </div>
        <div className="black-pointsX">
          {[...Array(3).keys()].map(i => (
            <div key={i} className={`pointX ${getPointsX() > i ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
      <div className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            index={index}
            tile={tile}
            flipped={flippedTiles.includes(index) || matchedPairs.includes(index) || showingAll}
            onClick={handleTileClick}
          />
        ))}
      </div>
      {gameOver && (
        <div classname="game-over-container">
          <div className="game-over">
            <h1>KONIEC GRY</h1>
            <h2 onClick={startGame}>ZAGRAJ PONOWNIE</h2>
            <h3 onClick={() => window.location.href = "http://localhost:3000"}>POWRÓT</h3>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
