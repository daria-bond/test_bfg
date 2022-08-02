import React, { FC, useRef, useState } from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useAppSelector } from "../../hooks/redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./QuestionsBlock.scss";

const QuestionsBlock: FC = () => {
  const [clicked, setClicked] = useState<number | null>(null);
  const { allQuestions } = useAppSelector((state) => state.questionsData);

  const openItemRef = useRef<any>(null); // TODO: типизация

  const onClose = () => {
    setClicked(null);
  };

  useOutsideClick(openItemRef, onClose, clicked);

  const handleToggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <ul ref={openItemRef}>
      {allQuestions.map((question, index) => (
        <QuestionItem
          key={index}
          onToggle={() => handleToggle(index)}
          title={question.title}
          score={question.score}
          ownerName={question.owner.display_name}
          active={clicked === index}
          isAnswered={question.is_answered}
          index={index}
          ownerReputation={question.owner.reputation}
          answerCount={question.answer_count}
        />
      ))}
    </ul>
  );
};

export default QuestionsBlock;
