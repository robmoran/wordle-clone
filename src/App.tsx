import React, { useState, useEffect, useCallback } from 'react';
import { LetterState, LetterStatus, GameStatus, KeyboardKey } from './types';
import { getRandomWord, isValidWord } from './wordList';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameMessage from './components/GameMessage';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Initialize an empty game board
const createEmptyBoard = (): LetterState[][] => {
  return Array(MAX_ATTEMPTS).fill(null).map(() => 
    Array(WORD_LENGTH).fill(null).map(() => ({ 
      letter: '', 
      status: LetterStatus.EMPTY 
    }))
  );
};

// Initialize empty keyboard
const createEmptyKeyboard = (): KeyboardKey[] => {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return keys.map(key => ({
    key,
    status: LetterStatus.EMPTY
  }));
};

function App() {
  const [targetWord, setTargetWord] = useState<string>('');
  const [board, setBoard] = useState<LetterState[][]>(createEmptyBoard());
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [keyStates, setKeyStates] = useState<KeyboardKey[]>(createEmptyKeyboard());
  const [message, setMessage] = useState<string | null>(null);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== GameStatus.PLAYING) return;
      
      const key = e.key.toUpperCase();
      
      // Handle letter keys (A-Z)
      if (/^[A-Z]$/.test(key)) {
        handleLetterInput(key);
      } 
      // Handle Enter key
      else if (key === 'ENTER') {
        handleEnterKey();
      } 
      // Handle Backspace/Delete key
      else if (key === 'BACKSPACE' || key === 'DELETE') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStatus, currentRow, currentCol, board]);

  // Reset the game
  const resetGame = useCallback(() => {
    const newTargetWord = getRandomWord();
    console.log("Target word:", newTargetWord); // For debugging
    
    setTargetWord(newTargetWord);
    setBoard(createEmptyBoard());
    setCurrentRow(0);
    setCurrentCol(0);
    setGameStatus(GameStatus.PLAYING);
    setKeyStates(createEmptyKeyboard());
    setMessage(null);
  }, []);

  // Handle letter input (A-Z)
  const handleLetterInput = (letter: string) => {
    if (currentCol < WORD_LENGTH) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol] = {
        letter,
        status: LetterStatus.EMPTY
      };
      
      setBoard(newBoard);
      setCurrentCol(currentCol + 1);
    }
  };

  // Handle backspace key press
  const handleBackspace = () => {
    if (currentCol > 0) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol - 1] = {
        letter: '',
        status: LetterStatus.EMPTY
      };
      
      setBoard(newBoard);
      setCurrentCol(currentCol - 1);
    }
  };

  // Handle enter key press
  const handleEnterKey = () => {
    // Check if the row is complete
    if (currentCol < WORD_LENGTH) {
      setMessage("Word must be 5 letters");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    // Get the current word
    const currentWord = board[currentRow].map(cell => cell.letter).join('');
    
    // Check if the word is valid
    if (!isValidWord(currentWord)) {
      setMessage("Not in word list");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    // Update letter statuses
    const newBoard = [...board];
    const targetLetters = targetWord.split('');
    const newKeyStates = [...keyStates];
    
    // First pass: find correct letters
    const letterCounts: Record<string, number> = {};
    targetLetters.forEach(letter => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });
    
    // Check for correct positions first
    for (let i = 0; i < WORD_LENGTH; i++) {
      const guessedLetter = currentWord[i];
      if (guessedLetter === targetLetters[i]) {
        newBoard[currentRow][i].status = LetterStatus.CORRECT;
        letterCounts[guessedLetter]--;
        
        // Update key status
        const keyIndex = newKeyStates.findIndex(k => k.key === guessedLetter);
        if (keyIndex !== -1) {
          newKeyStates[keyIndex].status = LetterStatus.CORRECT;
        }
      }
    }
    
    // Then check for present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      const guessedLetter = currentWord[i];
      
      // Skip already correctly positioned letters
      if (newBoard[currentRow][i].status === LetterStatus.CORRECT) {
        continue;
      }
      
      if (targetLetters.includes(guessedLetter) && letterCounts[guessedLetter] > 0) {
        newBoard[currentRow][i].status = LetterStatus.PRESENT;
        letterCounts[guessedLetter]--;
        
        // Update key status if it's not already CORRECT
        const keyIndex = newKeyStates.findIndex(k => k.key === guessedLetter);
        if (keyIndex !== -1 && newKeyStates[keyIndex].status !== LetterStatus.CORRECT) {
          newKeyStates[keyIndex].status = LetterStatus.PRESENT;
        }
      } else {
        newBoard[currentRow][i].status = LetterStatus.ABSENT;
        
        // Update key status if it's not already CORRECT or PRESENT
        const keyIndex = newKeyStates.findIndex(k => k.key === guessedLetter);
        if (keyIndex !== -1 && 
            newKeyStates[keyIndex].status !== LetterStatus.CORRECT && 
            newKeyStates[keyIndex].status !== LetterStatus.PRESENT) {
          newKeyStates[keyIndex].status = LetterStatus.ABSENT;
        }
      }
    }
    
    setBoard(newBoard);
    setKeyStates(newKeyStates);
    
    // Check if the player won
    if (currentWord === targetWord) {
      setGameStatus(GameStatus.WON);
      return;
    }
    
    // Move to the next row or end the game if no more attempts
    if (currentRow < MAX_ATTEMPTS - 1) {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    } else {
      setGameStatus(GameStatus.LOST);
    }
  };

  // Handle on-screen keyboard press
  const handleKeyPress = (key: string) => {
    if (gameStatus !== GameStatus.PLAYING) return;
    
    if (key === 'ENTER') {
      handleEnterKey();
    } else if (key === 'BACKSPACE') {
      handleBackspace();
    } else {
      handleLetterInput(key);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md py-4 mb-8">
        <h1 className="text-3xl font-bold text-center">Wordle Clone</h1>
      </header>
      
      <main className="flex-1 w-full max-w-md mx-auto px-4 flex flex-col items-center">
        <Board board={board} />
        <Keyboard keyStates={keyStates} onKeyPress={handleKeyPress} />
      </main>
      
      {(gameStatus !== GameStatus.PLAYING || message) && (
        <GameMessage 
          gameStatus={gameStatus} 
          targetWord={targetWord} 
          resetGame={resetGame} 
          message={message} 
        />
      )}
    </div>
  );
}

export default App;
