import { QuestionApi } from "./questions/question.api";
import "../styles/index.scss";
import { SelectedAnswer } from "./models/answer.model";

class App {
  private quizForm: HTMLFormElement;
  private questionElem: HTMLDivElement;
  private answersContainer: HTMLDivElement;
  private quizSubmit: HTMLButtonElement;

  private questionId = 1;
  private questionsLength = 0;

  private answers: SelectedAnswer[] = [];

  constructor(private questionApi: QuestionApi) {
    this.quizForm = document.querySelector<HTMLFormElement>(".quiz");
    this.questionElem =
      document.querySelector<HTMLDivElement>(".quiz__question");
    this.answersContainer =
      document.querySelector<HTMLDivElement>(".quiz__answers");
    this.quizSubmit =
      document.querySelector<HTMLButtonElement>(".quiz__submit");
  }

  async init() {
    await this.questionApi.getQuestionsLength().then(body => {
      this.questionsLength = body.length;
    });
    await this.setQuestion(this.questionId);

    this.quizForm.addEventListener("submit", async event => {
      event.preventDefault();

      this.quizSubmit.disabled = true;
      await this.submitHandler();
    });
  }

  private async setQuestion(id: number) {
    const question = await this.questionApi.getQuestion(id).catch(err => {
      console.log(err);
    });

    if (!question) {
      return;
    }

    this.questionElem.textContent = `${id}. ${question.question}`;
    this.setAnswers(this.questionId);
  }

  private async setAnswers(id: number) {
    const answers = await this.questionApi.getAnswers(id);

    if (!answers) {
      return;
    }

    this.answersContainer.innerHTML = "";
    answers.forEach(answer => {
      const answerElem = document.createElement("label");

      answerElem.classList.add("quiz__answer");
      answerElem.htmlFor = `answer-${answer.id}`;

      const inputElem = document.createElement("input");
      inputElem.type = "radio";
      inputElem.name = "answer";
      inputElem.value = answer.id.toString();
      inputElem.classList.add("quiz__answer__input");

      const innerElem = document.createElement("div");
      innerElem.classList.add("quiz__answer__inner");
      innerElem.textContent = answer.text;

      answerElem.append(inputElem, innerElem);
      this.answersContainer.append(answerElem);
    });
  }

  private async submitHandler() {
    const formData = new FormData(this.quizForm);

    const answer = formData.get("answer");
    if (!answer) {
      return;
    }

    this.answers.push({
      questionId: this.questionId,
      answerId: Number(answer),
    });

    const result = await this.questionApi.checkAnswer(
      this.questionId,
      Number(answer),
    );

    const answerElem = this.answersContainer.querySelector(
      `input[value="${answer}"]`,
    );

    const correctAnswerElem = this.answersContainer.querySelector(
      `input[value="${result.correctAnswerId}"]`,
    );

    if (!answerElem) {
      this.quizSubmit.disabled = false;
      return;
    }

    correctAnswerElem.classList.add("quiz__answer__input_valid");
    if (!result.isCorrect) {
      answerElem.classList.add("quiz__answer__input_error");
    }

    setTimeout(async () => {
      console.log(this.questionId, this.questionsLength);

      if (this.questionId >= this.questionsLength) {
        const result = await this.questionApi.calculateResult(this.answers);
        this.quizForm.innerHTML = `Отгадано вопросов: ${result.score} из ${this.questionsLength}`;

        this.quizSubmit.disabled = false;
        return;
      }

      this.quizSubmit.disabled = false;

      this.questionId++;
      this.setQuestion(this.questionId);
    }, 2000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const questionApi = new QuestionApi();
  const app = new App(questionApi);
  app.init();
});
