import React from "react";
import { Button } from "@mui/material";
import "./App.css";
import { useAppDispatch } from "./hooks/redux";
import { getAllQuestionsAction } from "./redux/questions/action";

const App = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(getAllQuestionsAction(new Date(2018, 1, 1)));
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default App;
