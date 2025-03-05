// A list of 5-letter words for our Wordle game
export const WORDS = [
  "REACT", "WORLD", "HELLO", "GHOST", "PLANE", 
  "BRAIN", "HOUSE", "TRACK", "SMILE", "SPACE",
  "EARTH", "LEVEL", "MUSIC", "WATER", "FLAME",
  "DREAM", "BEACH", "CHAIR", "TABLE", "LIGHT",
  "SOUND", "BREAD", "CLOCK", "PHONE", "MOUSE",
  "PAPER", "PLANT", "STONE", "HEART", "CLOUD",
  "RIVER", "OCEAN", "HAPPY", "FUNNY", "SWORD",
  "PIZZA", "CANDY", "SHELL", "GRASS", "FRUIT",
  "APPLE", "TIGER", "ANGEL", "ROBOT", "PIANO",
  "GHOST", "CLIMB", "DANCE", "LAUGH", "SLEEP"
];

// Get a random word from the list
export const getRandomWord = (): string => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

// Check if a word is in our word list
export const isValidWord = (word: string): boolean => {
  return WORDS.includes(word.toUpperCase());
};