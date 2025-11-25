'use client';

import React from 'react';
import { calculateDailyFortune } from '../utils/fortuneCalculator';
import html2canvas from 'html2canvas';
import { useStore } from '../store/useStore';

export default function DailyCard() {
  const { user, goal } = useStore();
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const lunar = `农历${today.getMonth() + 1}月${today.getDate()}日`;
  const fortune = calculateDailyFortune(user.birth, dateStr, goal);
  // 不再需要符咒路径
  // const talismanPath = generateTalismanPath(goal);

  const exportImage = async () => {
    const card = document.getElementById('talisman-card');
    if (card) {
      const canvas = await html2canvas(card);
      const link = document.createElement('a');
      link.download = `talisman-${dateStr}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div
      id="talisman-card"
      className="relative w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-[url('/bg/parchment-texture.jpg')] bg-cover border-4 border-[#8b4513] taoist-border mystical-glow overflow-hidden"
    >
      <div className="talisman-background"></div>
      <div className="absolute top-2 right-2 seal-stamp text-sm">今日运势</div>
      <div className="relative mx-auto my-6 p-6 bg-[url('/bg/wisdom-bg.jpg')] bg-cover bg-center rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 to-amber-700/40 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/icons/bagua.png')] bg-contain bg-no-repeat opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[url('/icons/taiji.png')] bg-contain bg-no-repeat opacity-40"></div>
        
        <div className="relative z-10 text-center">
          <div className="text-xl font-serif text-white leading-relaxed tracking-wider drop-shadow-lg">
            『 {fortune.dailyWisdom} 』
          </div>
          <div className="mt-4 text-right text-yellow-300 font-serif italic text-sm drop-shadow-md">
            — 太上道君
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-700 dark:text-gray-200 font-serif">
        <span>{dateStr}</span>
        <span>{lunar}</span>
      </div>
      <div className="mt-2 text-center text-2xl font-bold text-yellow-600 dark:text-yellow-300 font-serif">
        今日运势：{fortune.score} 分
      </div>
      <div className="flex justify-center gap-4 mt-1 text-sm">
        <span className="text-green-700 dark:text-green-400">宜：{fortune.yi}</span>
        <span className="text-red-700 dark:text-red-400">忌：{fortune.ji}</span>
      </div>
      <div className="mt-2 px-2 py-1 bg-yellow-50/80 dark:bg-yellow-900/40 rounded text-center text-sm font-serif">
        “{fortune.quote}”
      </div>
      <div className="mt-1 text-xs text-red-500 dark:text-red-300 text-center">
        {fortune.taboo}
      </div>
      <div className="mt-2 text-sm text-gray-800 dark:text-gray-200 text-center">
        {fortune.analysis}
      </div>
      <button
        onClick={exportImage}
        className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition hover:scale-105 font-serif text-lg"
      >
        📜 导出今日语录
      </button>
      <div className="five-elements mt-4 opacity-50">
        <div className="element wood" title="木">木</div>
        <div className="element fire" title="火">火</div>
        <div className="element earth" title="土">土</div>
        <div className="element metal" title="金">金</div>
        <div className="element water" title="水">水</div>
      </div>
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-gradient-radial from-yellow-200/30 via-transparent to-transparent rounded-2xl" />
    </div>
  );
}
