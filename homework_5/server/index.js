const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/db.json`);

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

const excludeAnswers = question =>
  question.answers.map(a => {
    const { correct: _, ...rest } = a;

    return { ...rest };
  });

server.get("/questions/length", (_, res) => {
  const questions = router.db.get("questions").value();
  res.json({
    length: questions.length,
  });
});

server.get("/questions", (_, res) => {
  const questions = router.db.get("questions").value();
  const serializedQuestions = questions.map(q => ({
    ...q,
    answers: excludeAnswers(q),
  }));

  res.json({
    ...serializedQuestions,
  });
});

server.get("/questions/:id", (req, res) => {
  const id = +req.params.id;
  const question = router.db.get("questions").value()[id - 1];

  res.json({
    ...question,
    answers: excludeAnswers(question),
  });
});

server.post("/calculate-result", (req, res) => {
  const questions = router.db.get("questions").value();
  const answers = req.body.answers;
  let correctAnswers = 0;

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    const correctQuestionAnswer = question.answers.find(
      answer => answer.correct,
    );

    if (correctQuestionAnswer.id === answer.answerId) {
      correctAnswers++;
    }
  });

  res.json({
    score: correctAnswers,
  });
});

server.post("/check-answer", (req, res) => {
  const questions = router.db.get("questions").value();
  const userAnswerId = req.body.answerId;
  const userQuestionId = req.body.questionId;

  const question = questions.find(q => q.id === userQuestionId);
  const correctQuestionAnswerId = question.answers.find(
    answer => answer.correct,
  ).id;

  const isCorrect = userAnswerId === correctQuestionAnswerId;

  res.json({
    isCorrect,
    correctAnswerId: correctQuestionAnswerId,
  });
});

server.use(router);
server.listen(8080, () => {
  console.log("JSON Server is running");
});
