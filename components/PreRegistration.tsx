import React, { useState, useEffect } from 'react';
import { Mail, Gift, Zap, CheckCircle, ArrowRight, LogIn } from 'lucide-react';

interface User {
  name: string;
  email: string;
}

interface PreRegistrationProps {
  user: User | null;
  onLoginClick: () => void;
}


const PreRegistration: React.FC<PreRegistrationProps> = ({ user, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      setEmail('');
    }
  }, [user]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError('사전예약을 하시려면 로그인이 필요합니다.');
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    setError('');
    // In a real app, you would send the email to a backend server here.
    console.log('Pre-registration email:', email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-12 animate-fade-in">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 md:p-12 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">사전예약이 완료되었습니다!</h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            정식 오픈 시 가장 먼저 이메일로 알려드리겠습니다. 사장님의 성공을 바로올림이 응원합니다!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="pre-register" className="py-12 animate-fade-in">
      <div className="bg-gradient-to-br from-sky-900/50 to-slate-900 border border-sky-700 rounded-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">정식 오픈 사전예약 이벤트</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            사장님들의 폭발적인 관심으로 결제 시스템 최종 승인 대기 중입니다. 지금 예약하고 특별 혜택을 가장 먼저 받으세요!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Benefits */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-sky-400 mb-4 flex items-center">
              <Gift className="w-6 h-6 mr-3" />
              사전예약 특별 혜택
            </h3>
            <ul className="space-y-4 text-slate-200">
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <span>기본 5개 + <span className="font-bold text-yellow-400">추가 10개! 총 15 무료 크레딧</span> 제공</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>정식 오픈 후 <span className="font-bold text-emerald-400">첫 결제 20% 할인 쿠폰</span> 증정</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div>
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">이메일 주소</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      readOnly
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg text-slate-300 placeholder:text-slate-400 py-3 pl-12 pr-4 cursor-not-allowed"
                    />
                  </div>
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
                >
                  <span>사전예약하고 혜택받기</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
               <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-slate-300 mb-4">로그인하고 간편하게 사전예약하세요!</p>
                  <button
                    onClick={onLoginClick}
                    className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-sky-500/30"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>로그인하고 혜택받기</span>
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreRegistration;