import React, { FC, MouseEvent } from "react";
import {
  decreaseQuestionScore,
  increaseQuestionScore,
} from "../../redux/questions/slice";
import { useAppDispatch } from "../../hooks/redux";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import "./ScoreBlock.scss";

interface IScoreBlock {
  score: number;
  index: number;
}

const ScoreBlock: FC<IScoreBlock> = ({ score, index }) => {
  const dispatch = useAppDispatch();

  const onChangeScore = (
    event: MouseEvent<HTMLButtonElement>,
    direction: -1 | 1
  ) => {
    direction === 1
      ? dispatch(increaseQuestionScore(index))
      : dispatch(decreaseQuestionScore(index));
    event.stopPropagation();
  };

  return (
    <div className="score-block-container">
      <p className="score-block-container__score-number">{score}</p>
      <div className="score-block-container__buttons-container">
        <IconButton onClick={(e) => onChangeScore(e, 1)}>
          <ExpandLessIcon />
        </IconButton>
        <IconButton onClick={(e) => onChangeScore(e, -1)}>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ScoreBlock;
