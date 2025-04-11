import React from 'react';
import MemoryGame from '@/components/MemoryGame';

const Game = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">记忆配对游戏</h1>
          <p className="text-gray-600 mt-2">翻转卡片并找出所有匹配的对子</p>
        </div>

        <MemoryGame />
      </div>
    </div>
  );
};

export default Game;