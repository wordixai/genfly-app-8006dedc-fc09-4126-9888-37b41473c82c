import React from 'react';
import { Button } from '@/components/ui/button';
import MemoryCard from './MemoryCard';
import { useMemoryGame } from '@/hooks/useMemoryGame';

const MemoryGame: React.FC = () => {
  const { gameState, flipCard, resetGame } = useMemoryGame(16); // 4x4 网格，共16张卡片
  const { cards, moves, matchedPairs, isGameOver } = gameState;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">移动次数: <span className="font-bold">{moves}</span></p>
          <p className="text-sm text-gray-600">匹配对数: <span className="font-bold">{matchedPairs} / {cards.length / 2}</span></p>
        </div>
        <Button onClick={resetGame} variant="outline">
          重新开始
        </Button>
      </div>

      {isGameOver && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          <p className="font-bold text-lg">恭喜！</p>
          <p>你用了 {moves} 次移动完成了游戏</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <MemoryCard 
            key={card.id} 
            card={card} 
            onClick={flipCard} 
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;