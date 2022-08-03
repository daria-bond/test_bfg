import React, { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button, TextField } from "@mui/material";
import { getAllQuestionsAction } from "../../redux/questions/action";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { isEqual } from "date-fns";
import "./Title.scss";

const Title: FC = () => {
  const { questionsFromDate, isLoadingQuestions, currentQuota } =
    useAppSelector((state) => state.questionsData);
  const dispatch = useAppDispatch();
  const [fromDate, setFromDate] = React.useState<Date | null>(
    new Date(2018, 0, 1)
  );

  const handleChange = (newDate: Date | null) => {
    setFromDate(newDate);
  };

  return (
    <div className="title-container">
      <p className="title-container__title">
        5 самых популярных вопросов на StackOverflow, содержащих
        &quot;react-redux&quot; в наименовании, начиная с
      </p>
      <div className="title-container__buttons-container">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            PopperProps={{
              className: "date-input__popper",
              placement: "bottom-start",
            }}
            inputFormat="MM/dd/yyyy"
            value={fromDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {!isLoadingQuestions &&
          fromDate &&
          !isEqual(fromDate, questionsFromDate) && (
            <Button
              title={`Доступная квота запросов: ${currentQuota}`}
              variant="outlined"
              onClick={() => {
                dispatch(getAllQuestionsAction(fromDate));
              }}
            >
              Поиск
            </Button>
          )}
      </div>
    </div>
  );
};

export default Title;
