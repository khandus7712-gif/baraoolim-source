import React from 'react';

interface StepTrackerProps {
  currentStep: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, title: '정보 입력' },
    { num: 2, title: '콘텐츠 생성' },
    { num: 3, title: '결과 확인' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                currentStep >= step.num
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {step.num}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 md:w-24 h-1 mx-2 transition-colors duration-500 ${
                  currentStep > step.num ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-slate-400 max-w-sm mx-auto">
        {steps.map((step) => (
          <span key={step.num} className={`font-medium ${currentStep === step.num ? 'text-sky-400' : ''}`}>
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepTracker;