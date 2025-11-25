'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../db/dexieDB';

function RadarChart({ data }: { data: number[] }) {
  const labels = ['身体', '财运', '心境'];
  const max = 5;
  const svgSize = 280;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  const radius = 80;

  const points = data.map((v, i) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const r = (v / max) * radius;
    return [
      centerX + Math.cos(angle) * r,
      centerY + Math.sin(angle) * r
    ].join(',');
  });

  return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 280 280" className="mx-auto my-4">
      <defs>
        <radialGradient id="baguaGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#f7e9c3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b4513" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx={centerX} cy={centerY} r={radius} fill="url(#baguaGradient)" />
      <polygon
        points={`${centerX},${centerY - radius} ${centerX + radius},${centerY} ${centerX},${centerY + radius} ${centerX - radius},${centerY}`}
        fill="none"
        stroke="#8b4513"
        strokeDasharray="4"
      />
      <polygon
        points={points.join(' ')}
        fill="rgba(139, 69, 19, 0.4)"
        stroke="#8b4513"
        strokeWidth="2"
      />
      {labels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const labelRadius = radius + 40;
        return (
          <text
            key={label}
            x={centerX + Math.cos(angle) * labelRadius}
            y={centerY + Math.sin(angle) * labelRadius + 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fill="#8b4513"
            fontFamily="serif"
            fontWeight="bold"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

function mockAIAnalysis(journals: any[]) {
  const last7 = journals.slice(-7);
  const health = 3 + Math.round(Math.random() * 2);
  const career = 3 + Math.round(Math.random() * 2);
  const mind = last7.length
    ? Math.round(
        last7.reduce((acc, j) => acc + (j.mood || 3), 0) / last7.length
      )
    : 3;
  return [health, career, mind];
}

export default function AnalysisChart() {
  const [data, setData] = useState([3, 3, 3]);
  const [suggest, setSuggest] = useState('');

  useEffect(() => {
    db.journals
      .orderBy('date')
      .toArray()
      .then(journals => {
        setData(mockAIAnalysis(journals));
        if (journals.length) {
          const last = journals[journals.length - 1];
          if (last.mood <= 2) setSuggest('昨日心情低落，今日宜多休息，静心养神。');
          else if (last.mood >= 4) setSuggest('昨日心情愉快，今日可积极进取。');
          else setSuggest('保持平常心，顺其自然。');
        }
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 p-6 paper-texture rounded-xl shadow-xl border-4 border-[#8b4513] mystical-glow">
      <div className="mb-4 text-center">
        <div className="text-2xl font-bold font-serif text-[#8b4513] flex items-center justify-center mb-2">
          <span className="mr-2">☯️</span>
          修行总览
          <span className="ml-2">☯️</span>
        </div>
        <div className="seal-stamp text-sm">玄机测算</div>
      </div>
      <RadarChart data={data} />
      <div className="mt-4 text-center text-base text-[#2c2416] font-serif bg-amber-50/70 rounded-lg p-4 border-2 border-amber-600 mystical-glow">
        <div className="font-bold text-amber-700 mb-2 flex items-center justify-center">
          <span className="mr-1">🔮</span>
          天机批示
          <span className="ml-1">🔮</span>
        </div>
        <div className="ancient-text text-lg mb-2">卜</div>
        {suggest || '继续修行，道法自然。'}
      </div>
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
