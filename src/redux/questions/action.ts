import { createAction } from "@reduxjs/toolkit";

export const getAllQuestionsAction = createAction<Date>(
  "QUESTIONS/GET_QUESTIONS"
);
