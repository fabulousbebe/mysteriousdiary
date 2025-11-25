'use client';

import React from 'react';

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  journalDates: string[];
}

export default function Calendar({ selectedDate, onDateSelect, journalDates }: CalendarProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // 获取当月第一天和最后一天
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
  // 获取当月第一天是星期几（0-6，0是周日）
  const firstDayOfWeek = firstDay.getDay();
  
  // 获取当月天数
  const daysInMonth = lastDay.getDate();
  
  // 生成日历网格
  const calendarDays = [];
  
  // 填充空白天数
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // 填充实际日期
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                      '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  const hasJournal = (day: number) => {
    return journalDates.includes(formatDate(day));
  };
  
  return (
    <div className="w-full paper-texture rounded-xl p-4 border-2 border-[#8b4513]">
      {/* 月份标题 */}
      <div className="text-center mb-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[url('/icons/taiji-left.png')] bg-contain bg-no-repeat"></div>
        <h3 className="text-2xl font-bold text-[#8b4513] font-serif inline-block px-4">
          {currentYear}年 {monthNames[currentMonth]}
        </h3>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[url('/icons/taiji-right.png')] bg-contain bg-no-repeat"></div>
      </div>
      
      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-bold text-[#8b4513] font-serif py-2 border-b border-amber-600/30">
            {day}
          </div>
        ))}
      </div>
      
      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }
          
          const dateStr = formatDate(day);
          const isSelected = selectedDate === dateStr;
          const isToday = day === today.getDate() && 
                         currentMonth === today.getMonth() && 
                         currentYear === today.getFullYear();
          const hasEntry = hasJournal(day);
          
          return (
            <button
              key={day}
              onClick={() => onDateSelect(dateStr)}
              className={`
                aspect-square rounded-lg font-serif font-bold transition-all p-1 relative
                ${isSelected ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white scale-110 shadow-lg z-10' : ''}
                ${!isSelected && hasEntry ? 'bg-amber-200 text-[#8b4513] hover:bg-amber-300' : ''}
                ${!isSelected && !hasEntry ? 'bg-amber-50/60 text-gray-500 hover:bg-amber-100' : ''}
                ${isToday ? 'ring-2 ring-red-500' : ''}
              `}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-lg">{day}</span>
                {hasEntry && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-amber-700">☯</span>
                )}
                {isToday && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}