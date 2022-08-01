import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUnixTime } from "date-fns";

export interface IQuestionsState {
  isLoadingQuestions: boolean;
  allQuestions: IQuestion[];
  questionsFromDate: number;
}

const initialState: IQuestionsState = {
  isLoadingQuestions: false,
  allQuestions: [],
  questionsFromDate: getUnixTime(new Date(2018, 1, 1)),
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
    setQuestionsFromDate: (state, { payload }: PayloadAction<number>) => {
      state.questionsFromDate = payload;
    },
  },
});

export const { setAllQuestions, setIsLoadingQuestions, setQuestionsFromDate } =
  questionsSlice.actions;

export default questionsSlice.reducer;
