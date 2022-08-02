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
  const { questionsFromDate } = useAppSelector((state) => state.questionsData);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<Date | null>(questionsFromDate);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div className="title-container">
      <span>
        5 самых популярных вопросов на StackOverflow, содержащих
        &quot;react-redux&quot; в наименовании, начиная с
      </span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {value && !isEqual(value, questionsFromDate) && (
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(getAllQuestionsAction(value));
          }}
        >
          Поиск
        </Button>
      )}
    </div>
  );
};

export default Title;
