export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  matchedPairs: number;
  isGameOver: boolean;
}