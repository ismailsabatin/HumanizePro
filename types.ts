
export enum Language {
  ENGLISH = 'English',
  ARABIC = 'Arabic',
}

export enum Tone {
  ACADEMIC = 'Academic',
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  CREATIVE = 'Creative',
}

export interface AnalysisResult {
  humanPercentage: number;
  aiPercentage: number;
}
