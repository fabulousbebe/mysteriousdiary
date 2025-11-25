'use client';

import DailyCard from './components/DailyCard';
import Onboarding from './components/Onboarding';
import JournalEditor from './components/JournalEditor';
import AnalysisChart from './components/AnalysisChart';
import JournalHistory from './components/JournalHistory';
import { useStore } from './store/useStore';

export default function Home() {
  const { user } = useStore();

  return (
    <main className="min-h-screen paper-texture text-[#2c2416] font-serif relative">
      {/* 背景装饰 */}
      <div className="absolute top-4 left-4 opacity-20">
        <div className="ancient-text text-6xl text-[#8b4513]">道</div>
      </div>
      <div className="absolute top-4 right-4 opacity-20">
        <div className="ancient-text text-6xl text-[#8b4513]">德</div>
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <div className="ancient-text text-6xl text-[#8b4513]">玄</div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-20">
        <div className="ancient-text text-6xl text-[#8b4513]">机</div>
      </div>
      
      <div className="py-8 px-4 max-w-4xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <div className="bagua-circle mx-auto mb-4 mystical-glow"></div>
          <h1 className="text-5xl font-extrabold text-[#8b4513] mb-2 font-serif">
            玄学日记
          </h1>
          <div className="text-xl text-[#d4af37] font-serif mb-4">TaoistDiaries</div>
          <div className="seal-stamp mx-auto">道法自然</div>
          
          {/* 五行元素 */}
          <div className="five-elements mt-6">
            <div className="element wood" title="木">木</div>
            <div className="element fire" title="火">火</div>
            <div className="element earth" title="土">土</div>
            <div className="element metal" title="金">金</div>
            <div className="element water" title="水">水</div>
          </div>
        </div>
        {!user?.name ? (
          <Onboarding />
        ) : (
          <>
            <DailyCard />
            <JournalEditor />
            <JournalHistory />
            <AnalysisChart />
          </>
        )}
      </div>
    </main>
  );
}