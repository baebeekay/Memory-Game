⚡ Pokémon Memory Game (Click Once!)
This project is a web-based memory card game built with React that tests your short-term memory. The goal is simple: click every card exactly once without clicking the same Pokémon twice. The cards shuffle after every successful click, making remembering locations impossible!

It demonstrates core modern React concepts, including Functional Components, Hooks (useState, useEffect, useCallback), and handling asynchronous API data fetching.

🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (LTS version recommended)

npm or yarn

Installation
Clone the repository:

Bash

git clone []
cd memory-game
Install dependencies: The project uses react, react-dom, and standard tooling.

Bash

npm install
# or
yarn install
Run the development server:

Bash

npm run dev
# or
yarn dev
The application will open in your browser, typically at http://localhost:5173.

🎮 How to Play
The game starts with 12 unique Pokémon cards fetched randomly from the PokéAPI.

Click any Pokémon card.

If you click a new card, your Current Score increases, and the entire deck shuffles randomly.

If you click a card you've already clicked in the current round, the game ends.

Your Best Score is updated if you surpass your previous high score.

The game automatically resets the deck after a loss or a win, and you start a new round.

✨ Key Features & Implementation
1. State Management with Hooks
The entire game state is managed using the useState hook in App.jsx:

cards: An array of objects, each containing Pokémon data (id, name, imageUrl) and a critical game state flag: isClicked: boolean.

currentScore and bestScore: Track game progress and high scores.

2. Asynchronous API Integration
Data for the cards is fetched on component mount using the useEffect hook:

The src/api/pokemonApi.js file uses the PokéAPI to retrieve a randomized set of unique Pokémon, ensuring a fresh deck every time the app loads.

3. Core Game Logic (handleCardClick)
The click handler utilizes the useCallback hook for performance and implements two primary branches:

Valid Click: Sets the clicked card's isClicked flag to true, increments currentScore, and triggers the shuffleArray utility to reorder the cards.

Invalid Click (Game Over): Updates the bestScore if necessary, resets currentScore to 0, resets the isClicked flag on all cards to false, and triggers a new shuffle.

4. Enhanced UI/UX
The application uses dedicated CSS (main.css and card.css) to provide a clean, engaging, and themed look with a focus on visual feedback:

Themed Scoreboard: Clear display of current and best scores using a Pokémon-themed color palette.

Responsive Grid Layout: Cards are displayed in a responsive grid that adjusts to different screen sizes.

Interactive Cards: Cards feature subtle lift/shadow hover effects for a better user experience.