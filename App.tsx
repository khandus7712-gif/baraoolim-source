import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import StepTracker from './components/StepTracker';
import Step1Form from './components/Step1Form';
import Step2ContentType from './components/Step2ContentType';
import Step3Result from './components/Step3Result';
import PreRegistration from './components/PreRegistration';
import AuthModal from './components/AuthModal';
import LoginPrompt from './components/LoginPrompt';
import Pricing from './components/Pricing';
import { generateMarketingContent } from './services/geminiService';
import { ContentType, ContentStyle, TargetCustomer, FormData } from './types';

interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [credits, setCredits] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const initialFormData: FormData = {
    businessName: '',
    menuName: '',
    location: '',
    cookingProcess: '',
    tasteFeatures: ['', '', ''],
    targetCustomer: '',
    pricePoint: '',
    storyBackground: '',
    contentStyle: ContentStyle.Storytelling,
    imageFile: null,
    imagePreview: null,
    contentType: ContentType.Instagram,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = (provider: 'google' | 'kakao') => {
    // This is a mock login. In a real app, you'd use an auth library.
    console.log(`Logging in with ${provider}`);
    const mockUser = { name: '홍길동', email: 'owner@baroolim.com' };
    setUser(mockUser);
    setCredits(5); // Give 5 free credits on login
    setIsAuthModalOpen(false);
    setStep(1); // Reset to step 1 on login
  };

  const handleLogout = () => {
    setUser(null);
    setCredits(0);
    setStep(1); // Reset to step 1 on logout
    setFormData(initialFormData);
  };

  const handlePricingClick = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleGenerateContent = useCallback(async () => {
    if (credits <= 0) {
      setError('크레딧이 부족합니다. 플랜을 구독하거나 크레딧을 구매해주세요.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const content = await generateMarketingContent(formData);
      setGeneratedContent(content);
      setCredits(prev => prev - 1); // Deduct 1 credit upon successful generation
      if (step !== 3) {
        setStep(3);
      }
    } catch (err) {
      console.error(err);
      setError('콘텐츠 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      // Keep user on step 2 to retry if it's the first generation attempt
    } finally {
      setIsGenerating(false);
    }
  }, [formData, credits, step]);

  const resetForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setGeneratedContent('');
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Form
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setStep(2)}
          />
        );
      case 2:
        return (
          <Step2ContentType
            formData={formData}
            setFormData={setFormData}
            prevStep={() => setStep(1)}
            generateContent={handleGenerateContent}
            isGenerating={isGenerating}
            error={error}
            credits={credits}
          />
        );
      case 3:
        return (
          <Step3Result
            generatedContent={generatedContent}
            formData={formData}
            resetForm={resetForm}
            generateAnother={() => setStep(2)}
            regenerateContent={handleGenerateContent}
            isGenerating={isGenerating}
            credits={credits}
          />
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header user={user} credits={credits} onLoginClick={() => setIsAuthModalOpen(true)} onLogout={handleLogout} onLogoClick={resetForm} onPricingClick={handlePricingClick} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {step === 1 && !user && (
           <Hero onLoginClick={() => setIsAuthModalOpen(true)} />
        )}

        {/* Show generator only when logged in */}
        {user ? (
          <>
            {step === 1 && <h2 className="text-center text-3xl font-bold text-white mb-8">안녕하세요, {user.name} 사장님! 시작해볼까요?</h2>}
            <StepTracker currentStep={step} />
            {renderStep()}
          </>
        ) : (
           <LoginPrompt onLoginClick={() => setIsAuthModalOpen(true)} />
        )}
        
        <div className="my-16 border-t border-slate-700"></div>

        <div ref={pricingRef}>
          <Pricing />
        </div>

        <div className="my-16 border-t border-slate-700"></div>

        <PreRegistration user={user} onLoginClick={() => setIsAuthModalOpen(true)}/>
        
        <div className="my-16 border-t border-slate-700"></div>

        <InfoSection />

      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
    </div>
  );
};

export default App;