import { Answer } from "../models/answer.model";

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}
