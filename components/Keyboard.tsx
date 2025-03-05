import React from 'react';
import { KeyboardKey, LetterStatus } from '@/types';

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
    
    const baseClasses = "rounded font-bold uppercase flex items-center justify-center text-center";
    
    const statusClasses = {
      [LetterStatus.CORRECT]: "bg-green-500 text-white",
      [LetterStatus.PRESENT]: "bg-yellow-500 text-white",
      [LetterStatus.ABSENT]: "bg-gray-700 text-white",
      [LetterStatus.EMPTY]: "bg-gray-300 text-black dark:bg-gray-600 dark:text-white"
    };
    
    // Special keys
    if (key === 'ENTER') {
      return `${baseClasses} text-xs h-14 w-16 ${statusClasses[status]}`;
    } else if (key === 'BACKSPACE') {
      return `${baseClasses} text-xs h-14 w-16 ${statusClasses[status]}`;
    }
    
    // Regular letter keys
    return `${baseClasses} h-14 w-9 text-sm ${statusClasses[status]}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex flex-col space-y-2">
        {/* First row */}
        <div className="flex justify-center space-x-1.5">
          {rows[0].map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
        
        {/* Second row - slightly indented for staggered effect */}
        <div className="flex justify-center space-x-1.5 px-6">
          {rows[1].map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
        
        {/* Third row */}
        <div className="flex justify-center space-x-1.5">
          {rows[2].map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;