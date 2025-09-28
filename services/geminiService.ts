
import { GoogleGenAI } from "@google/genai";
import { FormData, TargetCustomer } from '../types';

const customerMap: Record<string, string> = {
  [TargetCustomer.Family]: '가족과 함께하는 특별한 시간',
  [TargetCustomer.Office]: '바쁜 직장인의 든든한 한 끼',
  [TargetCustomer.Couple]: '연인과의 로맨틱한 식사',
  [TargetCustomer.Friends]: '친구들과의 즐거운 모임',
  [TargetCustomer.Solo]: '혼자만의 소중한 시간',
  [TargetCustomer.All]: '누구나 즐길 수 있는'
};

const styleDescriptionMap: Record<string, string> = {
    storytelling: "감성적이고 따뜻한 이야기를 담아 고객의 마음에 공감을 일으키는 스타일.",
    professional: "전문적인 지식과 용어를 사용하여 메뉴의 퀄리티와 신뢰도를 강조하는 스타일.",
    customer: "실제 고객의 후기나 경험담처럼 친근하고 솔직하게 장점을 어필하는 스타일.",
    emotional: "음식에 담긴 따뜻한 정이나 추억을 자극하여 감성적인 접근을 하는 스타일.",
    trendy: "최신 유행하는 밈이나 신조어를 사용하여 젊은 고객층에게 어필하는 스타일.",
    premium: "고급스러운 어휘와 표현을 사용하여 메뉴의 품격과 가치를 높이는 스타일.",
};

const createPrompt = (formData: FormData): string => {
  const tasteDesc = formData.tasteFeatures.filter(taste => taste.trim()).join(', ');
  const customerDesc = formData.targetCustomer ? (customerMap[formData.targetCustomer] || formData.targetCustomer) : '모든 고객';
  const styleDesc = styleDescriptionMap[formData.contentStyle] || '기본 스타일';

  return `
  당신은 '${formData.businessName}'의 사장님입니다. 당신의 가게와 메뉴에 대한 자부심과 애정을 담아, 고객들에게 직접 이야기하는 것처럼 진심을 담아 홍보 게시글을 한국어로 생성해주세요. 사장님의 목소리로, 우리 가게의 매력을 고객에게 직접 소개하는 글을 만드는 것이 목표입니다.

  ### 중요 생성 원칙
  1.  **사장님의 진심**: 당신이 직접 고객에게 말하듯이, 가게와 메뉴에 대한 당신의 자부심과 진심을 보여주세요. 과장보다는 솔직하고 따뜻한 어조가 좋습니다.
  2.  **친절한 설명**: 처음 오는 고객도 메뉴(${formData.menuName})를 쉽게 이해하고 매력을 느낄 수 있도록, 사장님이 직접 설명해주듯이 친절하게 알려주세요. (예: 아롱사태가 뭐냐구요? 소 한 마리에서 딱 두 점 나오는 귀한 부위인데, 그 쫀득함이 일품이죠!)
  3.  **실용적인 정보**: 고객이 궁금해할 가격/가성비 정보(${formData.pricePoint})를 자연스럽게 언급하여 방문을 고민하는 고객의 등을 가볍게 밀어주세요.

  ### 가게 기본 정보
  - 업체명: ${formData.businessName}
  - 대표 메뉴: ${formData.menuName}
  - 위치: ${formData.location}

  ### 메뉴 상세 정보
  - 조리 과정의 특별함: ${formData.cookingProcess || '입력되지 않음'}
  - 맛의 특징: ${tasteDesc || '입력되지 않음'}
  - 추천 고객: ${customerDesc}
  - 가격/가성비 포인트: ${formData.pricePoint || '입력되지 않음'}
  - 메뉴 개발 스토리: ${formData.storyBackground || '입력되지 않음'}

  ### 생성할 콘텐츠 형식
  - 플랫폼: ${formData.contentType}
  - 콘텐츠 스타일: ${formData.contentStyle} (${styleDesc})

  ### 플랫폼별 생성 가이드
  - **instagram**:
    - 시각적으로 매력적이고 감성적인 문구 사용.
    - 문단 사이에 적절한 이모지(Emoji)를 2~5개 사용하여 가독성을 높여주세요.
    - 게시글 끝에 업체명, 메뉴명, 위치명을 활용한 센스있는 해시태그와, #맛집, #맛스타그램 등 인기 해시태그를 총 5~10개 포함해주세요.
    - 전체적으로 밝고 긍정적인 톤을 유지해주세요.
  - **blog**:
    - 독자의 흥미를 끄는 제목으로 시작.
    - 소제목을 사용하여 글의 구조를 명확하게 해주세요. (예: ## 무엇이 특별할까요?)
    - 각 항목에 대해 상세하고 친절하게 설명하는 스토리텔링 형식으로 작성.
    - 독자가 방문하고 싶도록 마지막에 친근한 어조로 마무리해주세요.
  - **thread**:
    - 스레드(Thread) 형식에 맞게 여러 개의 짧은 메시지로 나누어 작성해주세요.
    - 각 메시지는 번호(예: 1/, 2/)로 시작하고, 이모지를 적절히 사용해주세요.
    - 마지막 메시지에는 위치 정보와 방문을 유도하는 문구를 포함해주세요.
    - 핵심 해시태그 2~3개를 포함해주세요.

  이제 위의 모든 지침에 따라, 사장님의 마음으로 홍보 게시글을 생성해주세요.
  `;
};

export const generateMarketingContent = async (formData: FormData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = createPrompt(formData);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate content from AI service.");
  }
};