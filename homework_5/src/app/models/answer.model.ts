export interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

export interface SelectedAnswer {
  questionId: number;
  answerId: number;
}
