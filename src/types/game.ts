export type AppView = 'home' | 'game' | 'chronicle' | 'about' | 'sources';

export interface Badge {
  id: string;
  name: string;
  gateNumber: number;
  description: string;
  iconName: string;
  dateOrEra: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  title?: string;
  prompt: string;
  situation?: string;
  bullets?: string[];
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ChronoItem {
  id: string;
  year: string;
  event: string;
  order: number;
}

export interface HeritageSortItem {
  id: string;
  text: string;
  category: 'save' | 'harm';
}

export interface ChronicleSection {
  id: string;
  title: string;
  period: string;
  description: string;
  imagePlaceholderTitle: string;
  imagePlaceholderSubtitle: string;
  sourceText: string;
  sourceNumber: number;
}
