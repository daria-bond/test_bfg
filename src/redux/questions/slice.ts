import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { responseToQuestion } from "../../utils/helpers/responseToQuestion";

export interface IQuestionsState {
  isLoadingQuestions: boolean;
  allQuestions: IQuestion[];
  currentQuota: number;
}

const initialState: IQuestionsState = {
  isLoadingQuestions: false,
  allQuestions: [],
  currentQuota: 0,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAllQuestions: (state, { payload }: PayloadAction<IQuestion[]>) => {
      state.allQuestions = payload;
    },
    setIsLoadingQuestions: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingQuestions = payload;
    },
    setCurrentQuota: (state, { payload }: PayloadAction<number>) => {
      state.currentQuota = payload;
    },
    increaseQuestionScore: (state, { payload }: PayloadAction<number>) => {
      state.allQuestions[payload].score = state.allQuestions[payload].score + 1;
    },
    decreaseQuestionScore: (state, { payload }: PayloadAction<number>) => {
      state.allQuestions[payload].score = state.allQuestions[payload].score - 1;
    },
    setCurrentQuotaAnsQuestions: (
      state,
      { payload }: PayloadAction<IResponseGetQuestions>
    ) => {
      state.currentQuota = payload.quota_remaining;
      state.allQuestions = payload.items.map(responseToQuestion);
    },
  },
});

export const {
  setAllQuestions,
  setIsLoadingQuestions,
  increaseQuestionScore,
  decreaseQuestionScore,
  setCurrentQuota,
  setCurrentQuotaAnsQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
