import React from 'react';
import { LetterState, LetterStatus } from '@/types';

interface BoardProps {
  board: LetterState[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const getLetterClass = (status: LetterStatus): string => {
    const baseClasses = "w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase";
    
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
    <div className="mb-5 mx-auto">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((letterState, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${getLetterClass(letterState.status)} mx-1`}
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