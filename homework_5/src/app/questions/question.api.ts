import { Answer, SelectedAnswer } from "../models/answer.model";
import { apiGet, apiPost } from "../utils/api";
import { Question } from "./question.model";

export interface GetQuestionsLengthResponse {
  length: number;
}

export interface CalculateResultResponse {
  score: number;
}

export interface CheckAnswerResponse {
  isCorrect: boolean;
  correctAnswerId: number;
}

export class QuestionApi {
  getQuestionsLength() {
    return apiGet<GetQuestionsLengthResponse>("/questions/length");
  }

  getQuestion(questionId: number) {
    return apiGet<Question>(`/questions/${questionId}`);
  }

  getAnswers(questionId: number) {
    return this.getQuestion(questionId).then(question => question.answers);
  }

  calculateResult(answers: SelectedAnswer[]) {
    return apiPost<{ answers: SelectedAnswer[] }, CalculateResultResponse>(
      "/calculate-result",
      { answers },
    );
  }

  checkAnswer(questionId: number, answerId: number) {
    return apiPost<SelectedAnswer, CheckAnswerResponse>("/check-answer", {
      questionId,
      answerId,
    });
  }
}
