import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { setCurrentQuotaAnsQuestions, setIsLoadingQuestions } from "./slice";
import { getAllQuestionsAction } from "./action";
import { getAllQuestions } from "../../services/questions";

function* workerGetAllQuestions({ payload }: PayloadAction<Date>) {
  try {
    yield put(setIsLoadingQuestions(true));
    const response: IResponse = yield getAllQuestions(payload);
    yield put(setCurrentQuotaAnsQuestions(response.data));
    yield put(setIsLoadingQuestions(false));
  } catch (e) {
    console.log("error", e);
  }
}

export function* watcherGetAllQuestions() {
  yield takeEvery(getAllQuestionsAction.toString(), workerGetAllQuestions);
}
