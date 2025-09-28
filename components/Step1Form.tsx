import React from 'react';
import { Store, Camera } from 'lucide-react';
import { FormData, ContentStyle, TargetCustomer } from '../types';

interface Step1FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
}

const contentStyles = [
  { id: ContentStyle.Storytelling, name: '스토리텔링형', desc: '감동적인 배경 이야기 중심' },
  { id: ContentStyle.Professional, name: '전문성 어필형', desc: '조리법과 재료의 전문성 강조' },
  { id: ContentStyle.Customer, name: '고객 중심형', desc: '고객의 니즈와 만족도 중심' },
  { id: ContentStyle.Emotional, name: '감성 어필형', desc: '따뜻함과 정감 있는 표현' },
  { id: ContentStyle.Trendy, name: '트렌드 반영형', desc: 'MZ세대와 트렌드에 맞춤' },
  { id: ContentStyle.Premium, name: '프리미엄형', desc: '고급스러움과 품격 강조' }
];

const targetCustomers = [
  { id: TargetCustomer.Family, name: '가족 모임' },
  { id: TargetCustomer.Office, name: '직장인 식사' },
  { id: TargetCustomer.Couple, name: '연인 데이트' },
  { id: TargetCustomer.Friends, name: '친구 모임' },
  { id: TargetCustomer.Solo, name: '혼밥족' },
  { id: TargetCustomer.All, name: '전 연령층' },
];


const Step1Form: React.FC<Step1FormProps> = ({ formData, setFormData, nextStep }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTasteChange = (index: number, value: string) => {
    const newTastes = [...formData.tasteFeatures] as [string, string, string];
    newTastes[index] = value;
    setFormData({ ...formData, tasteFeatures: newTastes });
  };

  const handleTargetCustomerPillClick = (customerId: TargetCustomer) => {
    const newTargetCustomer = formData.targetCustomer === customerId ? '' : customerId;
    setFormData({ ...formData, targetCustomer: newTargetCustomer });
  };

  const handleCustomTargetCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, targetCustomer: e.target.value });
  };


  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in border border-slate-700">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
        <Store className="w-6 h-6 mr-3 text-sky-400" />
        업체 정보를 입력해주세요
      </h2>

      <div className="space-y-8">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">대표 사진</label>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-sky-500 transition-colors">
            {formData.imagePreview ? (
              <div className="space-y-4">
                <img src={formData.imagePreview} alt="업로드된 이미지" className="max-h-48 mx-auto rounded-lg shadow-md" />
                <button
                  onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: null })}
                  className="text-sm text-red-400 hover:text-red-500 font-medium"
                >
                  이미지 삭제
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Camera className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400">음식 사진을 업로드해주세요</p>
                <p className="text-sm text-slate-500 mt-1">JPG, PNG 파일 지원</p>
              </label>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-700 pb-2">기본 정보</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">업체명 *</label>
              <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="예: 아롱하다" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">메뉴명 *</label>
              <input type="text" value={formData.menuName} onChange={(e) => setFormData({ ...formData, menuName: e.target.value })} placeholder="예: 아롱사태전골" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">위치 *</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="예: 창원 도계동" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>
        </div>

        {/* Detailed Info */}
        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-700 pb-2">상세 정보 (선택)</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">조리 과정의 특별함</label>
              <input type="text" value={formData.cookingProcess} onChange={(e) => setFormData({ ...formData, cookingProcess: e.target.value })} placeholder="예: 12시간 우린 사골육수, 특제 양념, 직화 조리 등" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">맛의 특징 (3가지)</label>
              <div className="space-y-2">
                {formData.tasteFeatures.map((taste, index) => (
                  <input key={index} type="text" value={taste} onChange={(e) => handleTasteChange(index, e.target.value)} placeholder={`${index + 1}번째 맛 특징 (예: 담백한 첫맛)`} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">주요 고객층</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {targetCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => handleTargetCustomerPillClick(customer.id)}
                    className={`border-2 rounded-lg p-3 text-center cursor-pointer transition-all text-sm font-medium ${
                      formData.targetCustomer === customer.id
                        ? 'border-sky-500 bg-sky-900/30 ring-2 ring-sky-500 text-sky-400'
                        : 'border-slate-600 hover:border-slate-500 bg-slate-700 text-slate-200'
                    }`}
                  >
                    {customer.name}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={targetCustomers.some(c => c.id === formData.targetCustomer) ? '' : formData.targetCustomer}
                onChange={handleCustomTargetCustomerChange}
                placeholder="직접 입력 (예: 반려동물 동반 손님)"
                className="w-full mt-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">가격대/가성비 포인트</label>
              <input type="text" value={formData.pricePoint} onChange={(e) => setFormData({ ...formData, pricePoint: e.target.value })} placeholder="예: 합리적인 가격, 푸짐한 양" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">창업자 스토리 또는 메뉴 개발 배경</label>
              <textarea value={formData.storyBackground} onChange={(e) => setFormData({ ...formData, storyBackground: e.target.value })} placeholder="예: 할머니 레시피에서 시작된 이야기" rows={3} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>
        </div>

        {/* Content Style */}
        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-700 pb-2">콘텐츠 스타일</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentStyles.map((style) => (
              <div key={style.id} onClick={() => setFormData({ ...formData, contentStyle: style.id })} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.contentStyle === style.id ? 'border-sky-500 bg-sky-900/30 ring-2 ring-sky-500' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}>
                <h4 className={`font-medium mb-1 ${formData.contentStyle === style.id ? 'text-sky-400' : 'text-slate-200'}`}>{style.name}</h4>
                <p className="text-sm text-slate-400">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={nextStep} disabled={!formData.businessName || !formData.menuName || !formData.location} className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500">
            다음 단계
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;