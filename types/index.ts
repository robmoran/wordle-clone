// Letter status represents the state of a letter in the game
export enum LetterStatus {
  CORRECT = "correct", // Letter is in the correct position
  PRESENT = "present", // Letter is in the word but in the wrong position
  ABSENT = "absent",   // Letter is not in the word
  EMPTY = "empty"      // No letter entered yet
}

// Represents a single letter cell in the game
export interface LetterState {
  letter: string;
  status: LetterStatus;
}

// Game states
export enum GameStatus {
  PLAYING,
  WON,
  LOST
}

// Keyboard key states
export interface KeyboardKey {
  key: string;
  status: LetterStatus;
}