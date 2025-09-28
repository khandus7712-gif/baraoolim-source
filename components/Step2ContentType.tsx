import React from 'react';
import { Menu, Wand2, Instagram, BookOpen, MessageSquare, AlertTriangle } from 'lucide-react';
import { FormData, ContentType } from '../types';

interface Step2ContentTypeProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  prevStep: () => void;
  generateContent: () => void;
  isGenerating: boolean;
  error: string | null;
  credits: number;
}

const contentTypes = [
  { id: ContentType.Instagram, name: '인스타그램 게시글', icon: Instagram, desc: '해시태그와 이모지가 포함된 SNS 게시글' },
  { id: ContentType.Blog, name: '블로그 포스트', icon: BookOpen, desc: '자세한 설명이 담긴 블로그용 콘텐츠' },
  { id: ContentType.Thread, name: '스레드', icon: MessageSquare, desc: '여러 개의 연결된 짧은 메시지' }
];

const Step2ContentType: React.FC<Step2ContentTypeProps> = ({ formData, setFormData, prevStep, generateContent, isGenerating, error, credits }) => {
  const hasNoCredits = credits <= 0;
  
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in border border-slate-700">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
        <Menu className="w-6 h-6 mr-3 text-sky-400" />
        어떤 콘텐츠를 만들까요?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              onClick={() => setFormData({ ...formData, contentType: type.id })}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all text-center ${formData.contentType === type.id ? 'border-sky-500 bg-sky-900/30 ring-2 ring-sky-500' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}
            >
              <Icon className={`w-10 h-10 mb-3 mx-auto ${formData.contentType === type.id ? 'text-sky-400' : 'text-slate-500'}`} />
              <h3 className="font-semibold text-slate-200 mb-2">{type.name}</h3>
              <p className="text-sm text-slate-400">{type.desc}</p>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mb-6 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-3" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={prevStep}
          className="bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
        >
          이전 단계
        </button>
        <button
          onClick={generateContent}
          disabled={isGenerating || hasNoCredits}
          className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>콘텐츠 생성 중...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>콘텐츠 생성하기 (1크레딧)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2ContentType;