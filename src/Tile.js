import React from 'react';
import './Tile.css';

const Tile = ({ index, tile, flipped, onClick }) => (
  <div className={`tile ${flipped ? 'flipped' : ''}`} onClick={() => onClick(index)}>
    <div className="tile-inner">
      <div className="tile-cover"></div>
      <div className="tile-content">
        <img src={tile} alt="tile content" />
      </div>
    </div>
  </div>
);

export default Tile;
