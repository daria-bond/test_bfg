import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { setAllQuestions, setIsLoadingQuestions } from "./slice";
import { getAllQuestionsAction } from "./action";
import { getAllQuestions } from "../../services/questions";

interface IResponseGetQuestions {
  items: IQuestion[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

interface IResponse {
  data: IResponseGetQuestions;
  status: number;
}

function* workerGetAllQuestions({ payload }: PayloadAction<Date>) {
  try {
    yield put(setIsLoadingQuestions(true));
    const response: IResponse = yield getAllQuestions(payload);
    yield put(setAllQuestions(response.data.items));
    yield put(setIsLoadingQuestions(false));
  } catch (e) {
    console.log("error", e);
  }
}

export function* watcherGetAllQuestions() {
  yield takeEvery(getAllQuestionsAction.toString(), workerGetAllQuestions);
}
