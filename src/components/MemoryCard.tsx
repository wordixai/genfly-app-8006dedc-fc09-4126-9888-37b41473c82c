import React from 'react';
import { Card } from '@/types/game';

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div 
      className={`
        relative w-full h-24 cursor-pointer rounded-lg transition-all duration-300 transform 
        ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        ${card.isMatched ? 'opacity-70' : ''}
      `}
      onClick={handleClick}
    >
      <div 
        className={`
          absolute inset-0 flex items-center justify-center rounded-lg shadow-md
          ${card.isFlipped || card.isMatched ? 'bg-blue-500 text-white' : 'bg-gray-200'}
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
          transition-all duration-300
        `}
      >
        {(card.isFlipped || card.isMatched) ? (
          <span className="text-2xl font-bold">{card.value}</span>
        ) : (
          <span className="text-xl text-gray-400">?</span>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;