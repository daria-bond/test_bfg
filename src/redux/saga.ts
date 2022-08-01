import { all } from "redux-saga/effects";
import { watcherGetAllQuestions } from "./questions/saga";

function* saga() {
  yield all([watcherGetAllQuestions()]);
}
export default saga;
