declare global {
  interface IQuestion {
    title: string;
    score: number;
    ownerName: string;
    isAnswered: boolean;
    ownerReputation: number;
    answerCount: number;
    questionId: number;
  }
}

export {};
