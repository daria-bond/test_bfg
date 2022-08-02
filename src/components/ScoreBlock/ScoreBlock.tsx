import React, { FC } from "react";
import {
  decreaseQuestionScore,
  increaseQuestionScore,
} from "../../redux/questions/slice";
import { useAppDispatch } from "../../hooks/redux";
import "./ScoreBlock.scss";

interface IScoreBlock {
  score: number;
  index: number;
}

const ScoreBlock: FC<IScoreBlock> = ({ score, index }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="score-block-container">
      <p className="score-block-container__score-number">{score}</p>
      <div className="score-block-container__buttons-container">
        <div
          onClick={(event) => {
            dispatch(increaseQuestionScore(index));
            event.stopPropagation();
          }}
        >
          +
        </div>
        <div
          onClick={(event) => {
            dispatch(decreaseQuestionScore(index));
            event.stopPropagation();
          }}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default ScoreBlock;
