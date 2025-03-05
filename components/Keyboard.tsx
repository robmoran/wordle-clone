import React from 'react';
import { KeyboardKey, LetterStatus } from '../types';

// Keyboard layout
const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

interface KeyboardProps {
  keyStates: KeyboardKey[];
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ keyStates, onKeyPress }) => {
  // Find state for a given key
  const getKeyState = (key: string): LetterStatus => {
    const keyState = keyStates.find(k => k.key === key);
    return keyState ? keyState.status : LetterStatus.EMPTY;
  };

  // Get CSS class for key status
  const getKeyClass = (key: string): string => {
    const status = getKeyState(key);
    
    const baseClasses = "m-1 rounded font-bold uppercase flex items-center justify-center";
    
    if (key === 'ENTER') {
      return `${baseClasses} text-xs sm:text-sm h-12 flex-grow`;
    } else if (key === 'BACKSPACE') {
      return `${baseClasses} text-xs sm:text-sm h-12 flex-grow`;
    }
    
    const statusClasses = {
      [LetterStatus.CORRECT]: "bg-green-500 text-white",
      [LetterStatus.PRESENT]: "bg-yellow-500 text-white",
      [LetterStatus.ABSENT]: "bg-gray-700 text-white",
      [LetterStatus.EMPTY]: "bg-gray-300 text-black dark:bg-gray-600 dark:text-white"
    };
    
    return `${baseClasses} w-[9vw] sm:w-10 h-12 ${statusClasses[status]}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-4 px-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;