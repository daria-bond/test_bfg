export const responseToQuestion = (resQuestion: IResQuestion): IQuestion => ({
  title: resQuestion.title,
  score: resQuestion.score,
  ownerName: resQuestion.owner.display_name,
  isAnswered: resQuestion.is_answered,
  ownerReputation: resQuestion.owner.reputation,
  answerCount: resQuestion.answer_count,
  questionId: resQuestion.question_id,
});
