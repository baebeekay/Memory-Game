import React from 'react';
import './styles/card.css';

const Card = ({ pokemon, handleClick }) => {
    return (
      <div className="card" onClick={() => handleClick(pokemon.id)}>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      </div>
    );
  };
  
  export default Card;