import { getUnixTime } from "date-fns";

const urls = {
  questions: {
    getAllQuestions: (fromDate: Date): string =>
      `https://api.stackexchange.com/2.3/search?pagesize=5&fromdate=${getUnixTime(
        fromDate
      )}&order=desc&sort=votes&intitle=react-redux&site=stackoverflow`,
  },
};

export default urls;
