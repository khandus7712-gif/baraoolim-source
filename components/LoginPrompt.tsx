import React from 'react';
import { LogIn, Wand2 } from 'lucide-react';

interface LoginPromptProps {
  onLoginClick: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLoginClick }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-8 text-center animate-fade-in border border-slate-700">
      <div className="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <Wand2 className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">로그인하고 AI 콘텐츠 생성을 시작하세요</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        사진 한 장만으로 가게에 꼭 맞는 마케팅 콘텐츠를 AI가 자동으로 만들어 드려요.
      </p>
      <button
        onClick={onLoginClick}
        className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 mx-auto"
      >
        <LogIn className="w-5 h-5" />
        <span>로그인하고 시작하기</span>
      </button>
    </div>
  );
};

export default LoginPrompt;