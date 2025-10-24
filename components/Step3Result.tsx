import React, { useState } from 'react';
import { Check, Copy, Store, Instagram, BookOpen, MessageSquare, RefreshCw } from 'lucide-react';
import { FormData, ContentType } from '../types';

interface Step3ResultProps {
  generatedContent: string;
  formData: FormData;
  resetForm: () => void;
  generateAnother: () => void;
  regenerateContent: () => void;
  isGenerating: boolean;
  credits: number;
}

const InstagramPreview: React.FC<{ content: string; formData: FormData }> = ({ content, formData }) => {
  const [copied, setCopied] = useState(false);

  const handlePostToInstagram = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center p-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
            <Store className="w-4 h-4 text-white" />
          </div>
          <span className="ml-3 font-semibold text-sm text-slate-200">{formData.businessName}</span>
        </div>
        {formData.imagePreview && <img src={formData.imagePreview} alt="업로드된 음식 사진" className="w-full aspect-square object-cover" />}
        <div className="p-3">
          <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans">
            {content}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePostToInstagram}
          className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold"
        >
          <Instagram className="w-5 h-5" />
          <span>{copied ? '복사 완료! 인스타그램으로 이동' : '인스타그램에 올리기'}</span>
        </button>
      </div>
    </div>
  );
};

const GeneralPreview: React.FC<{ content: string; formData: FormData }> = ({ content, formData }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const postToThreads = () => {
      const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(content)}`;
      window.open(threadsUrl, '_blank', 'noopener,noreferrer');
  }

  const contentTypeTitle = {
    [ContentType.Instagram]: '인스타그램 게시글',
    [ContentType.Blog]: '블로그 포스트',
    [ContentType.Thread]: '스레드',
  };
  
  const renderActionButton = () => {
    switch (formData.contentType) {
      case ContentType.Blog:
        return (
          <button onClick={copyToClipboard} className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-semibold">
            {copied ? <Check className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            <span>{copied ? '복사 완료!' : '블로그 내용 복사'}</span>
          </button>
        );
      case ContentType.Thread:
        return (
          <button onClick={postToThreads} className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors font-semibold">
             <MessageSquare className="w-5 h-5" />
             <span>스레드에 올리기</span>
          </button>
        );
      default: // Fallback for any other type
         return (
          <button onClick={copyToClipboard} className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors font-semibold">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? '복사 완료!' : '복사하기'}</span>
          </button>
        );
    }
  }

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-200">{contentTypeTitle[formData.contentType]}</h3>
        {renderActionButton()}
      </div>
      {formData.imagePreview && (
        <div className="mb-4">
          <img src={formData.imagePreview} alt="업로드된 사진" className="max-w-xs rounded-lg shadow-md" />
        </div>
      )}
      <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans">{content}</pre>
    </div>
  );
};

const Step3Result: React.FC<Step3ResultProps> = ({ generatedContent, formData, resetForm, generateAnother, regenerateContent, isGenerating, credits }) => {
  const showInstagramPreview = formData.contentType === ContentType.Instagram && formData.imagePreview;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in border border-slate-700">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
        <Check className="w-6 h-6 mr-3 text-emerald-400" />
        콘텐츠가 생성되었어요!
      </h2>

      {showInstagramPreview ? (
        <InstagramPreview content={generatedContent} formData={formData} />
      ) : (
        <GeneralPreview content={generatedContent} formData={formData} />
      )}

      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={resetForm} className="bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500">
          새로 만들기
        </button>
        <button
          onClick={regenerateContent}
          disabled={isGenerating || credits <= 0}
          className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>다시 생성 중...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              <span>다시 생성하기 ({credits > 0 ? '1크레딧' : '크레딧 부족'})</span>
            </>
          )}
        </button>
        <button onClick={generateAnother} className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500">
          다른 타입으로 생성
        </button>
      </div>
    </div>
  );
};

export default Step3Result;