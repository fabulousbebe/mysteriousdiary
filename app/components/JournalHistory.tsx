'use client';

import React, { useEffect, useState } from 'react';
import { db, Journal } from '../db/dexieDB';
import { useStore } from '../store/useStore';
import Calendar from './Calendar';

export default function JournalHistory() {
  const { user } = useStore();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  
  // 心情贴纸映射
  const getMoodSticker = (mood: number) => {
    const stickers = [
      { emoji: '😞', name: '沮丧' },
      { emoji: '😕', name: '低落' },
      { emoji: '😐', name: '平静' },
      { emoji: '😊', name: '愉悦' },
      { emoji: '😄', name: '喜悦' }
    ];
    return stickers[mood - 1] || stickers[2]; // 默认平静
  };

  useEffect(() => {
    if (user?.name) {
      db.journals
        .where('user')
        .equals(user.name)
        .toArray()
        .then(records => {
          records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setJournals(records);
        });
    }
  }, [user]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const journal = journals.find(j => j.date === date);
    setSelectedJournal(journal || null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 paper-texture rounded-xl shadow-xl border-4 border-[#8b4513] mystical-glow">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#8b4513] inline-block">
          <span className="mr-2">📜</span>
          玄学日历
          <span className="ml-2">📜</span>
        </h2>
        <div className="seal-stamp text-sm mt-2">岁月如梭</div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            journalDates={journals.map(j => j.date)}
          />
        </div>
        
        <div className="md:w-1/2">
          {selectedJournal ? (
            <div className="border-2 border-[#8b4513] p-4 rounded-lg bg-amber-50/80">
              <h3 className="text-xl font-bold text-[#8b4513] mb-2 flex items-center">
                <span className="mr-2">🕰️</span>
                {selectedJournal.date} 修行记录
              </h3>
              <p className="text-[#2c2416] p-3 rounded">{selectedJournal.content}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-2xl">{getMoodSticker(selectedJournal.mood).emoji}</span>
                <span className="text-amber-700 font-serif">{getMoodSticker(selectedJournal.mood).name}</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#8b4513] font-serif">
              <p>选择一个日期查看修行记录</p>
              <div className="mt-4 text-6xl">☯</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}