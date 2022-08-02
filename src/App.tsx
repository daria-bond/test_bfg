import React, { useEffect } from "react";
import "./App.scss";
import { useAppDispatch } from "./hooks/redux";
import { getAllQuestionsAction } from "./redux/questions/action";
import Title from "./components/Title/Title";
import QuestionsBlock from "./components/QuestionsBlock/QuestionsBlock";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllQuestionsAction(new Date(2018, 0, 1)));
  }, []);

  return (
    <div className="app-container">
      <Title />
      <QuestionsBlock />
    </div>
  );
};

export default App;
