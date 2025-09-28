import React from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: 'google' | 'kakao') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-sm border border-slate-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">바로 시작하기</h2>
          <p className="text-slate-400 mb-8">SNS 계정으로 1초 만에 로그인하세요.</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => onLogin('google')}
            className="w-full flex items-center justify-center bg-white text-slate-800 font-medium py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-3" />
            구글로 시작하기
          </button>
          <button
            onClick={() => onLogin('kakao')}
            className="w-full flex items-center justify-center bg-[#FEE500] text-black font-medium py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.12 13.92c-.23.11-.49.18-.76.18-.7 0-1.27-.57-1.27-1.27s.57-1.27 1.27-1.27c.27 0 .53.07.76.18l.01-.01c.46-.21.78-.66.78-1.21 0-.7-.57-1.27-1.27-1.27-.27 0-.53.07-.76.18l.01-.01c-.46-.21-.78-.66-.78-1.21 0-.7.57-1.27 1.27-1.27.53 0 .98.33 1.18.78.2-.45.65-.78 1.18-.78.7 0 1.27.57 1.27 1.27 0 .55-.32 1-.78 1.21l.01.01c.23-.11.49-.18.76-.18.7 0 1.27.57 1.27 1.27s-.57 1.27-1.27 1.27c-.27 0-.53-.07-.76-.18l-.01.01c-.46.21-.78.66-.78 1.21 0 .7.57 1.27 1.27 1.27.27 0 .53-.07.76-.18l-.01.01c.46.21.78.66.78 1.21 0 .7-.57 1.27-1.27 1.27-.53 0-.98-.33-1.18-.78-.2.45-.65-.78-1.18-.78-.7 0-1.27-.57-1.27-1.27 0-.55.32-1 .78-1.21l-.01-.01z"/>
            </svg>
            카카오로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;