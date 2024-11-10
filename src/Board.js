import React from 'react';
import Tile from './Tile';

const Board = ({ tiles, flippedTiles, onTileClick, isInitialFlip }) => {
  return (
    <div className="board">
      {tiles.map((tile, index) => (
        <Tile
          key={tile.id}
          color={tile.color}
          isFlipped={isInitialFlip || flippedTiles.includes(index) || tile.matched}
          onClick={() => onTileClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
