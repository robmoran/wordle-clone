# Wordle Clone

A React implementation of the popular word-guessing game Wordle, built with TypeScript and styled with Tailwind CSS.

## Features

- 🎮 Classic Wordle gameplay with 6 attempts to guess a 5-letter word
- 🎨 Clean UI with Tailwind CSS styling
- 🌓 Light and dark mode support
- ⌨️ On-screen keyboard and physical keyboard input
- 📱 Responsive design that works well on mobile and desktop
- 🔄 Play again functionality

## How to Play

1. Try to guess the 5-letter word in 6 attempts or fewer
2. Type your guess using your keyboard or the on-screen keyboard
3. Press "Enter" to submit your guess
4. The color of the tiles will change to show how close your guess was:
   - 🟩 Green: Letter is correct and in the right position
   - 🟨 Yellow: Letter is in the word but in the wrong position
   - ⬛ Gray: Letter is not in the word

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Create React App

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/wordle-clone.git
   cd wordle-clone
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder

## Future Improvements

- Add statistics tracking
- Implement daily word feature
- Add animations for tile flipping
- Add a hard mode
- Implement word definitions at the end of the game
- Add share functionality

## License

MIT

## Acknowledgements

- Inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html) by Josh Wardle
- Built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/)