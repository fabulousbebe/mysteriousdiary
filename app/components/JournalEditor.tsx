'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { db } from '../db/dexieDB';
import { generateEncouragement } from '../utils/encouragementGenerator';
import { calculateDailyFortune } from '../utils/fortuneCalculator';

export default function JournalEditor() {
  const { user, goal } = useStore();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const [saved, setSaved] = useState(false);
  const [dailyFortune, setDailyFortune] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const fortune = calculateDailyFortune(user.birth, today, goal);
    setDailyFortune(fortune);
  }, [user.birth, goal]);
  
  // 心情贴纸选项
  const moodStickers = [
    { id: 1, emoji: '😞', name: '沮丧', color: 'bg-blue-100 hover:bg-blue-200' },
    { id: 2, emoji: '😕', name: '低落', color: 'bg-gray-100 hover:bg-gray-200' },
    { id: 3, emoji: '😐', name: '平静', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 4, emoji: '😊', name: '愉悦', color: 'bg-green-100 hover:bg-green-200' },
    { id: 5, emoji: '😄', name: '喜悦', color: 'bg-pink-100 hover:bg-pink-200' }
  ];

  const today = new Date().toISOString().slice(0, 10);

  const [encouragement, setEncouragement] = useState('');

  const saveJournal = async () => {
    const fullContent = `
日期：${today}
修行目标：${goal}
今日运势：${dailyFortune.score}分
宜：${dailyFortune.yi}
忌：${dailyFortune.ji}
禁忌：${dailyFortune.taboo}
今日名言：${dailyFortune.quote}
运势分析：${dailyFortune.analysis}
每日玄学语录：${dailyFortune.dailyWisdom}

修行记录：
${content}

今日心境：${moodStickers.find(s => s.id === mood)?.name} ${moodStickers.find(s => s.id === mood)?.emoji}
    `.trim();

    await db.journals.put({
      date: today,
      user: user.name,
      content: fullContent,
      mood
    });
    setSaved(true);
    const encouragementMessage = generateEncouragement(content);
    setEncouragement(encouragementMessage);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 paper-texture rounded-xl shadow-xl border-4 border-[#8b4513] mystical-glow">
      <div className="mb-4 text-center">
        <div className="text-2xl font-bold font-serif text-[#8b4513] flex items-center justify-center mb-2">
          <span className="mr-2">📜</span>
          今日修行日志
          <span className="ml-2">📜</span>
        </div>
        <div className="seal-stamp text-sm">修行记录</div>
      </div>
      <textarea
        className="w-full h-40 p-4 rounded-lg border-2 border-[#8b4513] bg-amber-50/80 focus:bg-white focus:border-amber-600 transition mb-4 font-serif text-[#2c2416]"
        placeholder="记录今日所见所闻，心得体悟..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="mb-4">
        <div className="text-base font-serif text-[#8b4513] font-bold mb-3 text-center">今日心境：</div>
        <div className="flex justify-around gap-2">
          {moodStickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => setMood(sticker.id)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all
                ${mood === sticker.id 
                  ? 'border-amber-600 scale-110 shadow-lg ' + sticker.color 
                  : 'border-amber-300 ' + sticker.color}
              `}
            >
              <span className="text-3xl mb-1">{sticker.emoji}</span>
              <span className="text-xs font-serif text-[#8b4513]">{sticker.name}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={saveJournal}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition hover:scale-105 font-serif text-lg"
      >
        {saved ? '✓ 已镌刻' : '📝 镌刻记忆'}
      </button>
      {saved && (
        <div className="mt-3 text-amber-700 text-center font-serif text-lg animate-pulse">
          ✨ 心得已镌刻于道经之中！✨
        </div>
      )}
      {encouragement && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-inner">
          <h3 className="text-lg font-bold text-amber-800 mb-2">道君之言：</h3>
          <p className="text-amber-900 font-serif">{encouragement}</p>
        </div>
      )}
      <div className="five-elements mt-4 opacity-50">
        <div className="element wood" title="木">木</div>
        <div className="element fire" title="火">火</div>
        <div className="element earth" title="土">土</div>
        <div className="element metal" title="金">金</div>
        <div className="element water" title="水">水</div>
      </div>
    </div>
  );
}
