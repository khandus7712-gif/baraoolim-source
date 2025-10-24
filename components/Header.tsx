import React from 'react';
import { Sparkles, LogIn, LogOut } from 'lucide-react';

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
  credits: number;
  onLoginClick: () => void;
  onLogout: () => void;
  onLogoClick: () => void;
  onPricingClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, credits, onLoginClick, onLogout, onLogoClick, onPricingClick }) => {
  return (
    <header>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={onLogoClick} 
            className="text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 rounded-md -m-2 p-2 transition-opacity hover:opacity-80"
            aria-label="Home"
          >
            <h1 className="text-3xl font-bold" style={{ letterSpacing: '-0.05em' }}>
              <span style={{ color: '#4285F4' }}>b</span>
              <span style={{ color: '#EA4335' }}>a</span>
              <span style={{ color: '#FBBC05' }}>r</span>
              <span style={{ color: '#4285F4' }}>o</span>
              <span style={{ color: '#34A853' }}>o</span>
              <span style={{ color: '#EA4335' }}>l</span>
              <span style={{ color: '#4285F4' }}>i</span>
              <span style={{ color: '#34A853' }}>m</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">자영업자를 위한 마케팅 콘텐츠 생성 서비스</p>
          </button>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">{credits}</span>
                  <span className="text-sm text-slate-400">크레딧</span>
                </div>
                <button 
                  onClick={onPricingClick}
                  className="text-slate-300 hover:text-white font-semibold text-sm transition-colors px-3 py-2"
                >
                  요금제
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-slate-700 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-slate-600 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onPricingClick}
                  className="text-slate-300 hover:text-white font-semibold text-sm transition-colors px-3 py-2"
                >
                  요금제
                </button>
                <button 
                  onClick={onLoginClick}
                  className="bg-sky-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-sky-600 transition-colors flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>로그인 / 회원가입</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;