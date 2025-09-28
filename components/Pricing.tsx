import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-12 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">내 가게에 딱 맞는 플랜을 선택하세요</h2>
        <p className="mt-4 text-slate-400">무료로 시작하고, 필요할 때 업그레이드하세요.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Subscription Plans */}
        <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
          {/* Starter Plan */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col">
            <h3 className="text-2xl font-bold text-white">Starter</h3>
            <p className="text-slate-400 mt-2 mb-6">SNS 마케팅을 막 시작한 사장님</p>
            <div className="my-4">
              <span className="text-4xl font-extrabold text-white">월 9,900원</span>
            </div>
            <p className="font-semibold text-sky-400 mb-6">매월 30 크레딧 제공</p>
            <ul className="space-y-3 text-slate-300 mb-8 flex-grow">
              <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>매일 1개 콘텐츠 생성 가능</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>모든 콘텐츠 스타일 사용</span></li>
            </ul>
            <button className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors">플랜 선택하기</button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-sky-900/30 border-2 border-sky-500 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-sky-500 text-white text-sm font-bold transform translate-x-1/4 rotate-45" style={{top: '12px', right: '-34px'}}>
              인기
            </div>
            <h3 className="text-2xl font-bold text-white">Pro</h3>
            <p className="text-slate-300 mt-2 mb-6">여러 채널을 활발하게 운영하는 사장님</p>
            <div className="my-4">
              <span className="text-4xl font-extrabold text-white">월 24,900원</span>
            </div>
            <p className="font-semibold text-yellow-400 mb-6">매월 100 크레딧 제공</p>
            <ul className="space-y-3 text-slate-200 mb-8 flex-grow">
              <li className="flex items-start"><Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" /><span>넉넉한 크레딧으로 자유로운 생성</span></li>
              <li className="flex items-start"><Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" /><span>모든 콘텐츠 스타일 사용</span></li>
              <li className="flex items-start"><Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" /><span>향후 출시될 신규 기능 우선 접근</span></li>
            </ul>
            <button className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">플랜 선택하기</button>
          </div>
        </div>

        {/* Credit Packs */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">크레딧 충전</h3>
            <p className="text-slate-400 mb-8">구독은 부담스럽고, 필요할 때만 쓰고 싶다면?</p>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">10 크레딧</p>
                <p className="text-sm text-slate-300">5,000원</p>
              </div>
              <button className="bg-sky-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors">구매</button>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">50 크레딧</p>
                <p className="text-sm text-slate-300">20,000원 <span className="text-emerald-400">(20% 할인)</span></p>
              </div>
              <button className="bg-sky-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors">구매</button>
            </div>
          </div>
        </div>
      </div>
       <p className="text-center text-sm text-slate-500 mt-8">연간 구독 시 2개월분 요금이 할인됩니다.</p>
    </section>
  );
};

export default Pricing;