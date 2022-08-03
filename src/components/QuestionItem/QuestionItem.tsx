import React, { FC, useRef } from "react";
import "./QuestionItem.scss";
import ScoreBlock from "../ScoreBlock/ScoreBlock";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { ItemTypes } from "../../@types/ItemTypes";
import { useDoubleClick } from "../../hooks/useDoubleClick";

interface IQuestionItem {
  active: boolean;
  onToggle: () => void;
  onSwap: () => void;
  index: number;
  moveQuestionItem: (dragIndex: number, hoverIndex: number) => void;
  questionInfo: IQuestion;
  selected: boolean;
}

const QuestionItem: FC<IQuestionItem> = ({
  active,
  onToggle,
  index,
  moveQuestionItem,
  questionInfo,
  onSwap,
  selected,
}) => {
  const {
    title,
    score,
    ownerName,
    isAnswered,
    ownerReputation,
    questionId,
    answerCount,
  } = questionInfo;

  const ref = useRef<HTMLLIElement>(null);

  const hybridClick = useDoubleClick(
    () => onSwap(),
    () => onToggle()
  );

  const [{ handlerId }, drop] = useDrop<
    IQuestionItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.QUESTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IQuestionItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQuestionItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: () => {
      return { questionId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className={`question-item-container ${selected ? "selected" : ""}`}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div
        className={`question-item-container__button ${
          isAnswered ? "is-answered" : "is-not-answered"
        } ${selected ? "selected" : ""}`}
        onClick={hybridClick}
      >
        <span className="question-item-container__button__title">{title}</span>
        <ScoreBlock score={score} index={index} />
      </div>

      <div
        className={`question-item-container__additional-content ${
          active ? "active" : ""
        }`}
      >
        <p>Создатель вопроса: {ownerName}</p>
        <p>Рейтинг создателя вопроса: {ownerReputation}</p>
        <p>Количество ответов: {answerCount}</p>
      </div>
    </li>
  );
};

export default QuestionItem;
