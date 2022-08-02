import React, { FC, useRef } from "react";
import "./QuestionItem.scss";
import ScoreBlock from "../ScoreBlock/ScoreBlock";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { ItemTypes } from "../../@types/ItemTypes";

interface IQuestionItem {
  active: boolean;
  onToggle: () => void;
  index: number;
  moveQuestionItem: (dragIndex: number, hoverIndex: number) => void;
  questionInfo: IQuestion;
}

const QuestionItem: FC<IQuestionItem> = ({
  active,
  onToggle,
  index,
  moveQuestionItem,
  questionInfo,
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
    collect: (monitor: any) => ({
      // TODO: any
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className="question-item-container"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <button
        className={`question-item-container__button ${
          isAnswered ? "is-answered" : "is-not-answered"
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
