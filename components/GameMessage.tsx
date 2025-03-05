import React from 'react';
import { GameStatus } from '../types';

interface GameMessageProps {
  gameStatus: GameStatus;
  targetWord: string;
  resetGame: () => void;
  message: string | null;
}

const GameMessage: React.FC<GameMessageProps> = ({ 
  gameStatus, 
  targetWord, 
  resetGame,
  message
}) => {
  if (gameStatus === GameStatus.PLAYING && !message) {
    return null;
  }

  let messageText = message;
  let showResetButton = false;

  if (gameStatus === GameStatus.WON) {
    messageText = "Congratulations! You won! 🎉";
    showResetButton = true;
  } else if (gameStatus === GameStatus.LOST) {
    messageText = `Game over! The word was "${targetWord}".`;
    showResetButton = true;
  }

  // Simple notification for invalid words
  if (gameStatus === GameStatus.PLAYING && message) {
    return (
      <div className="fixed top-16 sm:top-20 left-0 right-0 flex justify-center z-50 px-4">
        <div className="bg-white dark:bg-gray-800 py-3 px-6 rounded-lg shadow-lg w-full max-w-xs text-center">
          <p className="text-gray-800 dark:text-white font-medium text-base">
            {messageText}
          </p>
        </div>
      </div>
    );
  }

  // Full modal for game over states
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {messageText}
        </h2>
        
        <button
          onClick={resetGame}
          className="w-full py-3 px-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameMessage;