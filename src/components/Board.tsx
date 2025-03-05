import React from 'react';
import { LetterState, LetterStatus } from '../types';

interface BoardProps {
  board: LetterState[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const getLetterClass = (status: LetterStatus): string => {
    const baseClasses = "w-[14vw] h-[14vw] sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase";
    
    switch (status) {
      case LetterStatus.CORRECT:
        return `${baseClasses} bg-green-500 text-white border-green-500`;
      case LetterStatus.PRESENT:
        return `${baseClasses} bg-yellow-500 text-white border-yellow-500`;
      case LetterStatus.ABSENT:
        return `${baseClasses} bg-gray-700 text-white border-gray-700`;
      case LetterStatus.EMPTY:
      default:
        return `${baseClasses} bg-transparent border-gray-300 dark:border-gray-600`;
    }
  };

  return (
    <div className="grid grid-rows-6 gap-1 mb-4 w-full max-w-xs sm:max-w-md mx-auto">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {row.map((letterState, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getLetterClass(letterState.status)}
            >
              {letterState.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;