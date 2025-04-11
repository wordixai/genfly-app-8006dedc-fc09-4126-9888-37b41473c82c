import { useState, useEffect } from 'react';
import { Card, GameState } from '@/types/game';

// 创建一个包含配对卡片的数组
const createCards = (size: number = 16): Card[] => {
  // 确保卡片数量是偶数
  const adjustedSize = size % 2 === 0 ? size : size + 1;
  
  // 创建值的数组（每个值出现两次）
  const values = Array.from({ length: adjustedSize / 2 }, (_, i) => i + 1);
  const pairedValues = [...values, ...values];
  
  // 随机排序
  const shuffled = pairedValues.sort(() => Math.random() - 0.5);
  
  // 创建卡片对象
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false
  }));
};

export function useMemoryGame(size: number = 16) {
  const [gameState, setGameState] = useState<GameState>({
    cards: createCards(size),
    flippedCards: [],
    moves: 0,
    matchedPairs: 0,
    isGameOver: false
  });

  // 检查游戏是否结束
  useEffect(() => {
    if (gameState.matchedPairs === size / 2) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
    }
  }, [gameState.matchedPairs, size]);

  // 处理卡片翻转
  const flipCard = (id: number) => {
    // 如果已经翻转了两张卡片，或者点击的卡片已经匹配或翻转，则不做任何操作
    if (
      gameState.flippedCards.length === 2 ||
      gameState.cards[id].isMatched ||
      gameState.cards[id].isFlipped
    ) {
      return;
    }

    // 翻转卡片
    const updatedCards = [...gameState.cards];
    updatedCards[id] = { ...updatedCards[id], isFlipped: true };

    // 更新已翻转的卡片
    const updatedFlippedCards = [...gameState.flippedCards, id];

    // 如果翻转了两张卡片，检查是否匹配
    if (updatedFlippedCards.length === 2) {
      const [firstId, secondId] = updatedFlippedCards;
      const firstCard = updatedCards[firstId];
      const secondCard = updatedCards[secondId];

      // 增加移动次数
      const updatedMoves = gameState.moves + 1;

      if (firstCard.value === secondCard.value) {
        // 匹配成功
        updatedCards[firstId] = { ...firstCard, isMatched: true };
        updatedCards[secondId] = { ...secondCard, isMatched: true };
        
        setGameState({
          cards: updatedCards,
          flippedCards: [],
          moves: updatedMoves,
          matchedPairs: gameState.matchedPairs + 1,
          isGameOver: gameState.matchedPairs + 1 === size / 2
        });
      } else {
        // 匹配失败，设置定时器将卡片翻回
        setGameState({
          cards: updatedCards,
          flippedCards: updatedFlippedCards,
          moves: updatedMoves,
          matchedPairs: gameState.matchedPairs,
          isGameOver: false
        });

        // 延迟翻回卡片
        setTimeout(() => {
          const resetCards = [...updatedCards];
          resetCards[firstId] = { ...resetCards[firstId], isFlipped: false };
          resetCards[secondId] = { ...resetCards[secondId], isFlipped: false };
          
          setGameState(prev => ({
            ...prev,
            cards: resetCards,
            flippedCards: []
          }));
        }, 1000);
      }
    } else {
      // 只翻转了一张卡片
      setGameState({
        ...gameState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards
      });
    }
  };

  // 重置游戏
  const resetGame = () => {
    setGameState({
      cards: createCards(size),
      flippedCards: [],
      moves: 0,
      matchedPairs: 0,
      isGameOver: false
    });
  };

  return {
    gameState,
    flipCard,
    resetGame
  };
}