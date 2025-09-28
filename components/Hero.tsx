import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onLoginClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
  return (
    <div className="text-center p-8 md:p-12 mb-12 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
        사진 한 장으로<br />
        <span className="text-sky-400">마케팅 완성</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
        AI가 5분만에 인스타그램부터 블로그까지 자동 생성
      </p>
      <div className="mt-8 flex justify-center">
        <button
          onClick={onLoginClick}
          className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          <span>무료로 시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;