import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useAppSelector } from "../../hooks/redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./QuestionsBlock.scss";
import update from "immutability-helper";

const QuestionsBlock: FC = () => {
  const [clicked, setClicked] = useState<number | null>(null);
  const { allQuestions, isLoadingQuestions } = useAppSelector(
    (state) => state.questionsData
  );

  const [questionsList, setQuestionsList] = useState<IQuestion[]>(allQuestions);
  const openItemRef = useRef<any>(null); // TODO: типизация

  useEffect(() => {
    setQuestionsList(allQuestions);
  }, [allQuestions]);

  const onClose = () => {
    setClicked(null);
  };

  useOutsideClick(openItemRef, onClose, clicked);

  const handleToggle = (id: number) => {
    if (clicked === id) {
      return setClicked(null);
    }
    setClicked(id);
  };

  const moveQuestionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setQuestionsList((prevQuestionsList: IQuestion[]) =>
        update(prevQuestionsList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevQuestionsList[dragIndex] as IQuestion],
          ],
        })
      );
    },
    []
  );

  const renderQuestionItem = useCallback(
    (question: IQuestion, index: number) => {
      return (
        <QuestionItem
          key={question.questionId}
          onToggle={() => handleToggle(question.questionId)}
          active={clicked === question.questionId}
          index={index}
          moveQuestionItem={moveQuestionItem}
          questionInfo={question}
        />
      );
    },
    [clicked]
  );

  return (
    <>
      {isLoadingQuestions ? (
        <div>123</div> // TODO: добавить скелет или спинер
      ) : (
        <ul ref={openItemRef}>
          {questionsList.map((question, index) =>
            renderQuestionItem(question, index)
          )}
        </ul>
      )}
    </>
  );
};

export default QuestionsBlock;
