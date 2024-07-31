import { useDispatch, useSelector } from "react-redux";
import {
  selectAnswer,
  setQuestionSelected,
} from "../../../redux/reducer/QuestionReducer";
import { useCallback, useEffect, useState } from "react";
import styles from "../css/question.module.css";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Question({ index, item, partId }) {
  const dispatch = useDispatch();
  const [idAnswer, setIdAnswer] = useState(-1);
  const sectionQuestion = useSelector(
    (state) => state.question.sectionQuestion
  );
  useEffect(() => {
    const handleGetAnswers = () => {
        const indexPart = sectionQuestion.findIndex((part) => part.id === partId);
        const indexQuestion = sectionQuestion[indexPart].questionIds.findIndex(
          (question) => question.id === item.id
        );
        if (indexQuestion !== -1) {
            if(sectionQuestion[indexPart].questionIds[indexQuestion].answerId !== -1){
               return sectionQuestion[indexPart].questionIds[indexQuestion].answerId;
            }else{
                return -1;
            }
        }
      };
      setIdAnswer(handleGetAnswers);
    }, [sectionQuestion, partId, item.id]);



  const handleSelectAnswer = useCallback(
    (answerId) => {
        console.log(partId, item.id, answerId);
      dispatch(selectAnswer({ partId, questionId: item.id, answerId }));
      setIdAnswer(answerId);
    },
    [dispatch, item.id, partId]
  );
  return (
    <div className={styles.question_container}>
      <div className={styles.number_Question}>{item.id}</div>
      <div className={styles.question_content}>
        {item?.description && item?.hideQuestion === false && (
          <strong>{item?.description}</strong>
        )}
        {item?.image && (
          <img
            src={item?.image}
            alt="question"
            className={styles.question_image}
          />
        )}
        <div className={styles.answer_container}>
          <div className={styles.option}>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              value={idAnswer}
              onChange={(e) => handleSelectAnswer(e.target.value)}>
              {item?.options?.map((answer) =>
                item?.hideOption === false ? (
                  <FormControlLabel
                    value={answer?.id}
                    control={<Radio />}
                    label={answer?.name + ". " + answer?.content}
                  />
                ) : (
                  <FormControlLabel
                    value={answer?.id}
                    control={<Radio />}
                    label={answer?.name}
                  />
                )
              )}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
