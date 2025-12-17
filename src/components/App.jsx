// src/components/App.jsx 

import React, { useState, useEffect, useCallback } from 'react';
import Scoreboard from './Scoreboard';
import Card from './Card';
import { fetchPokemonData } from '../api/pokemonApi';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); 
  const [gameMessage, setGameMessage] = useState(''); 

  // Initial Data Fetching on Mount
  useEffect(() => {
    const loadCards = async () => {
      try {
        const initialCards = await fetchPokemonData();
        if (initialCards.length === 0) {
            throw new Error("Failed to load any Pokémon cards.");
        }
        setCards(shuffleArray(initialCards));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, []); 

  // Main Click Handler Logic
  const handleCardClick = useCallback((id) => {
    // Clear the message on click
    setGameMessage('');
    
    setCards(prevCards => {
      const clickedCard = prevCards.find(card => card.id === id);

      // --- 1. GAME OVER: Card was already clicked ---
      if (clickedCard.isClicked) {
        
        setCurrentScore(prevScore => {
          if (prevScore > bestScore) {
            setBestScore(prevScore);
          }
          // Set Game Over Message
          setGameMessage(`Game Over! You clicked ${clickedCard.name} twice.`); 
          return 0; // Reset score
        });
        
        const resetCards = prevCards.map(card => ({ ...card, isClicked: false }));
        
        // Reset the index and return the new shuffled deck
        setCurrentCardIndex(0);
        return shuffleArray(resetCards);
      } 
      
      // --- 2. VALID CLICK ---
      else {
        // Update Score and check for win
        setCurrentScore(prevScore => {
          const newScore = prevScore + 1;
          
          if (newScore === prevCards.length) {
            // Set Win Message
            setGameMessage("You Win! You clicked every Pokémon!");
            
            if (newScore > bestScore) {
                 setBestScore(newScore);
            }
            setCurrentCardIndex(0); 
            return 0; // Reset score
          }

          return newScore;
        });

        // Mark the current card as clicked
        const updatedCards = prevCards.map(card => 
          card.id === id ? { ...card, isClicked: true } : card
        );
        
        // Shuffle the deck and move to the next index
        const shuffledCards = shuffleArray(updatedCards);
        setCurrentCardIndex(prevIndex => (prevIndex + 1) % shuffledCards.length);

        return shuffledCards;
      }
    });
  }, [currentScore, bestScore]); 
  
  if (isLoading) {
    return <div className="app"><h1>Loading Pokémon Cards...</h1></div>;
  }
  if (error) {
    return <div className="app"><h1>Error: {error}</h1><p>Please check your network connection or API setup.</p></div>;
  }
  
  const currentPokemon = cards[currentCardIndex];

  return (
    <div className="app">
      <h1>Pokémon Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      
      {/* Display the game message (Loss or Win) */}
      {gameMessage && (
        <p className={`game-message ${gameMessage.includes('Game Over') ? 'loss' : 'win'}`}>
          {gameMessage}
          {gameMessage.includes('Game Over') && 
            <button onClick={() => setGameMessage('')} className="reset-button">Start New Game</button>
          }
        </p>
      )}

      {/* Instructions are shown only when the game is active */}
      {!gameMessage && <p className="instructions">Don't click the same Pokémon twice!</p>}
      
      <div className="slider-container">
        {/* Render the single card when the game is active (no message showing) */}
        {currentPokemon && !gameMessage && (
          <Card 
            key={currentPokemon.id} 
            pokemon={currentPokemon} 
            handleClick={handleCardClick} 
          />
        )}
        {/* Placeholder message when game is over/won */}
        {gameMessage && <div className="static-message-box">Click "Start New Game" to continue.</div>}
      </div>
    </div>
  );
};

export default App;