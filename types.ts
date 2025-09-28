
export enum ContentType {
  Instagram = 'instagram',
  Blog = 'blog',
  Thread = 'thread',
}

export enum ContentStyle {
  Storytelling = 'storytelling',
  Professional = 'professional',
  Customer = 'customer',
  Emotional = 'emotional',
  Trendy = 'trendy',
  Premium = 'premium',
}

export enum TargetCustomer {
  Family = 'family',
  Office = 'office',
  Couple = 'couple',
  Friends = 'friends',
  Solo = 'solo',
  All = 'all',
}

export interface FormData {
  businessName: string;
  menuName: string;
  location: string;
  cookingProcess: string;
  tasteFeatures: [string, string, string];
  targetCustomer: string;
  pricePoint: string;
  storyBackground: string;
  contentStyle: ContentStyle;
  imageFile: File | null;
  imagePreview: string | null;
  contentType: ContentType;
}