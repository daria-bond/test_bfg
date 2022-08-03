import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useAppSelector } from "../../hooks/redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import update from "immutability-helper";
import { arraySwap } from "../../utils/helpers/arraySwap";
import { CircularProgress } from "@mui/material";
import "./QuestionsBlock.scss";

const QuestionsBlock: FC = () => {
  const { allQuestions, isLoadingQuestions } = useAppSelector(
    (state) => state.questionsData
  );

  const [clicked, setClicked] = useState<number | null>(null);
  const [doubleClicked, setDoubleClicked] = useState<number | null>(null);
  const [questionsList, setQuestionsList] = useState<IQuestion[]>(allQuestions);

  const openItemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setQuestionsList(allQuestions);
  }, [allQuestions]);

  const onClose = () => {
    setClicked(null);
  };

  const onUnselected = () => {
    setDoubleClicked(null);
  };

  useOutsideClick(openItemRef, onClose, clicked);
  useOutsideClick(openItemRef, onUnselected, doubleClicked);

  const handleToggle = (id: number) => {
    if (clicked === id) {
      return setClicked(null);
    }
    setClicked(id);
  };

  const handleSwap = (index: number) => {
    if (doubleClicked === index) {
      setDoubleClicked(null);
      return;
    }

    if (doubleClicked === null) {
      setDoubleClicked(index);
      return;
    }

    setQuestionsList(arraySwap(questionsList, doubleClicked, index));
    setDoubleClicked(null);
    return;
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
          onSwap={() => handleSwap(index)}
          selected={index === doubleClicked}
        />
      );
    },
    [clicked, doubleClicked]
  );

  return (
    <>
      {isLoadingQuestions ? (
        <div className="spinner-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <ul ref={openItemRef as MutableRefObject<HTMLUListElement>}>
            {questionsList.map((question, index) =>
              renderQuestionItem(question, index)
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default QuestionsBlock;
