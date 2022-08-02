import React, { FC } from "react";
import "./QuestionItem.scss";
import ScoreBlock from "../ScoreBlock/ScoreBlock";

interface IQuestionItem {
  title: string;
  score: number;
  ownerName: string;
  ownerReputation: number;
  active: boolean;
  onToggle: () => void;
  isAnswered: boolean;
  index: number;
  answerCount: number;
}

const QuestionItem: FC<IQuestionItem> = ({
  title,
  score,
  ownerName,
  ownerReputation,
  active,
  onToggle,
  isAnswered,
  index,
  answerCount,
}) => {
  return (
    <li className="question-item-container">
      <button
        className={`${
          isAnswered
            ? "question-item-container__button is-answered"
            : "question-item-container__button is-not-answered"
        }`}
        onClick={onToggle}
      >
        <p className="question-item-container__button__title">{title}</p>
        <ScoreBlock score={score} index={index} />
      </button>

      {active && (
        <div className="question-item-container__additional-content">
          <p>Создатель вопроса: {ownerName}</p>
          <p>Рейтинг создателя вопроса: {ownerReputation}</p>
          <p>Количество ответов: {answerCount}</p>
        </div>
      )}
    </li>
  );
};

export default QuestionItem;
