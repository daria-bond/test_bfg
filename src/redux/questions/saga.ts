import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setAllQuestions,
  setIsLoadingQuestions,
  setQuestionsFromDate,
} from "./slice";
import { getAllQuestionsAction } from "./action";
import { getAllQuestions } from "../../services/questions";

interface IResponseGetQuestions {
  items: IResQuestion[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

interface IResponse {
  data: IResponseGetQuestions;
  status: number;
}

const responseToQuestion = (resQuestion: IResQuestion): IQuestion => ({
  title: resQuestion.title,
  score: resQuestion.score,
  ownerName: resQuestion.owner.display_name,
  isAnswered: resQuestion.is_answered,
  ownerReputation: resQuestion.owner.reputation,
  answerCount: resQuestion.answer_count,
  questionId: resQuestion.question_id,
});

function* workerGetAllQuestions({ payload }: PayloadAction<Date>) {
  try {
    yield put(setIsLoadingQuestions(true));
    const response: IResponse = yield getAllQuestions(payload);
    yield put(setAllQuestions(response.data.items.map(responseToQuestion)));
    yield put(setQuestionsFromDate(payload));
    yield put(setIsLoadingQuestions(false));
  } catch (e) {
    console.log("error", e);
  }
}

export function* watcherGetAllQuestions() {
  yield takeEvery(getAllQuestionsAction.toString(), workerGetAllQuestions);
}
