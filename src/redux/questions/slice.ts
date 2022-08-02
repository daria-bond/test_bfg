import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IQuestionsState {
  isLoadingQuestions: boolean;
  allQuestions: IQuestion[];
  questionsFromDate: Date;
}

const initialState: IQuestionsState = {
  isLoadingQuestions: false,
  allQuestions: [],
  questionsFromDate: new Date(2018, 0, 1),
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
    setQuestionsFromDate: (state, { payload }: PayloadAction<Date>) => {
      state.questionsFromDate = payload;
    },
    increaseQuestionScore: (state, { payload }: PayloadAction<number>) => {
      state.allQuestions[payload].score = state.allQuestions[payload].score + 1;
    },
    decreaseQuestionScore: (state, { payload }: PayloadAction<number>) => {
      state.allQuestions[payload].score = state.allQuestions[payload].score - 1;
    },
  },
});

export const {
  setAllQuestions,
  setIsLoadingQuestions,
  setQuestionsFromDate,
  increaseQuestionScore,
  decreaseQuestionScore,
} = questionsSlice.actions;

export default questionsSlice.reducer;
