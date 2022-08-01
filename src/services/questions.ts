import { get } from "../api";
import urls from "../api/urls/index";

export const getAllQuestions = (payload: Date) =>
  get(urls.questions.getAllQuestions(payload));
