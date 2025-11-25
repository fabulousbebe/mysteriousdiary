'use client';

import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const goals = ['求财', '求姻缘', '保平安', '学业', '事业', '自定义'];

export default function Onboarding() {
  const { setUser, setGoal } = useStore();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [goal, setGoalState] = useState(goals[0]);
  const [customGoal, setCustomGoal] = useState('');
  const [step, setStep] = useState(0);
  const [includeTime, setIncludeTime] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name, birth });
    setGoal(goal === '自定义' ? customGoal : goal);
    setStep(1);
  };

  if (step === 1) {
    return (
      <div className="p-8 text-center paper-texture rounded-xl border-4 border-[#8b4513] shadow-xl max-w-md mx-auto mystical-glow">
        <div className="bagua-circle mx-auto mb-6"></div>
        <div className="text-3xl font-bold text-[#8b4513] font-serif mb-4">
          欢迎踏入修仙之路
        </div>
        <div className="text-2xl text-[#d4af37] font-serif mb-4">
          {name}道友
        </div>
        <div className="seal-stamp mx-auto mb-4">道友已入门</div>
        <div className="text-lg text-[#2c2416] font-serif mb-4">
          汝之玄学日记已开启，愿道法护佑。
        </div>
        <div className="five-elements">
          <div className="element wood" title="木">木</div>
          <div className="element fire" title="火">火</div>
          <div className="element earth" title="土">土</div>
          <div className="element metal" title="金">金</div>
          <div className="element water" title="水">水</div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-[url('/bg/parchment-texture.jpg')] bg-cover rounded-xl shadow-xl border-4 border-[#8b4513] mt-8"
    >
      <div className="mb-6">
        <label className="block text-base font-bold mb-2 text-[#8b4513] font-serif">道友法号</label>
        <input
          className="w-full p-3 rounded-lg border-2 border-[#8b4513] bg-amber-50/80 focus:bg-white focus:border-amber-600 transition font-serif text-[#2c2416]"
          placeholder="请输入您的姓名"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-base font-bold mb-2 text-[#8b4513] font-serif">
          生辰八字
        </label>
        <div className="mb-3 flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="timeOption"
              checked={includeTime}
              onChange={() => setIncludeTime(true)}
              className="mr-2 accent-amber-600"
            />
            <span className="text-[#2c2416] font-serif">知道具体时辰</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="timeOption"
              checked={!includeTime}
              onChange={() => setIncludeTime(false)}
              className="mr-2 accent-amber-600"
            />
            <span className="text-[#2c2416] font-serif">仅知年月日</span>
          </label>
        </div>
        <input
          className="w-full p-3 rounded-lg border-2 border-[#8b4513] bg-amber-50/80 focus:bg-white focus:border-amber-600 transition font-serif text-[#2c2416]"
          type={includeTime ? "datetime-local" : "date"}
          value={birth}
          onChange={e => setBirth(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-base font-bold mb-2 text-[#8b4513] font-serif">
          修行目标
        </label>
        <select
          className="w-full p-3 rounded-lg border-2 border-[#8b4513] bg-amber-50/80 focus:bg-white focus:border-amber-600 transition font-serif text-[#2c2416]"
          value={goal}
          onChange={e => setGoalState(e.target.value)}
        >
          {goals.map(g => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {goal === '自定义' && (
        <div className="mb-6">
          <label className="block text-base font-bold mb-2 text-[#8b4513] font-serif">
            自定义目标
          </label>
          <input
            className="w-full p-3 rounded-lg border-2 border-[#8b4513] bg-amber-50/80 focus:bg-white focus:border-amber-600 transition font-serif text-[#2c2416]"
            placeholder="请输入您的修行目标"
            value={customGoal}
            onChange={e => setCustomGoal(e.target.value)}
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition hover:scale-105 font-serif text-lg"
      >
        🔮 开启修仙之旅
      </button>
    </form>
  );
}
