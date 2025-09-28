
import React from 'react';
import { Instagram, BookOpen, MessageSquare, BrainCircuit, CheckCircle, FileImage, ThumbsUp } from 'lucide-react';

const InfoSection: React.FC = () => {
  const features = [
    { icon: Instagram, title: '인스타그램 게시글', description: '해시태그와 이모지가 포함된 SNS 게시글' },
    { icon: BookOpen, title: '블로그 포스트', description: '자세한 설명이 담긴 블로그용 콘텐츠' },
    { icon: MessageSquare, title: '스레드', description: '여러 개의 연결된 짧은 메시지' },
  ];

  const processSteps = [
    { icon: FileImage, title: '사진 업로드', description: '매력적인 제품이나 가게 사진 한 장을 올려주세요' },
    { icon: BrainCircuit, title: 'AI 분석', description: 'AI가 이미지를 분석하고 브랜드 분석을 시작해요' },
    { icon: ThumbsUp, title: '완성!', description: '원하는 마케팅 콘텐츠가 자동으로 생성돼요' },
  ];

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in">
      {/* Introduction */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">바로올림이란?</h2>
        <p className="max-w-3xl mx-auto text-slate-300 text-lg">
          단 한 장의 제품 사진으로 모든 마케팅 콘텐츠를 자동 생성하는{' '}
          <span className="text-sky-400 font-semibold">AI 마케팅 자동화 서비스</span>입니다.
        </p>
      </section>

      {/* Pain Points & Solutions */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">🤔 이런 고민 있으시죠?</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start"><span className="text-red-400 mr-3 mt-1">▪</span><span>마케팅 글 쓰는 게 너무 어려워요</span></li>
            <li className="flex items-start"><span className="text-red-400 mr-3 mt-1">▪</span><span>해시태그 뭘 써야 할지 모르겠어요</span></li>
            <li className="flex items-start"><span className="text-red-400 mr-3 mt-1">▪</span><span>블로그 글 쓸 시간이 없어요</span></li>
            <li className="flex items-start"><span className="text-red-400 mr-3 mt-1">▪</span><span>매번 새로운 문구를 생각해내기 힘들어요</span></li>
          </ul>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">✨ 바로올림이 해결해드려요!</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>사진 한 장으로 모든 콘텐츠 자동 생성</span></li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>트렌드에 맞는 해시태그 추천</span></li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>4000자 이상 풍부한 블로그 글</span></li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" /><span>매번 새로운 창의적인 문구</span></li>
          </ul>
        </div>
      </section>

      {/* Core Features */}
      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-10">3가지 핵심 콘텐츠를 바로 생성</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-700/50 hover:border-sky-500 transition-all transform hover:-translate-y-1">
                  <div className="flex justify-center mb-4">
                    <div className="bg-slate-700 rounded-full p-3">
                      <Icon className="w-8 h-8 text-sky-400" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-12">이렇게 간단해요!</h2>
        <div className="relative flex flex-col md:flex-row justify-between items-center max-w-3xl mx-auto">
          {/* Dashed line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-700" style={{ transform: 'translateY(-50%)' }}>
             <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: 'linear-gradient(to right, #475569 50%, transparent 50%)',
                backgroundSize: '16px 1px',
             }}></div>
          </div>
          
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 flex flex-col items-center text-center p-4">
                <div className="w-20 h-20 rounded-full bg-sky-500 text-white flex items-center justify-center text-3xl font-bold border-4 border-slate-900 mb-4">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 max-w-xs">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default InfoSection;