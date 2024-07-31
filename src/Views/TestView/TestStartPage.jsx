import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@mui/material";
import Layout from "../../Layout";
import { Test1 } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPart, setParts, setQuestionSelected } from "../../redux/reducer/QuestionReducer";
import Part from "./components/Part";
import { useNavigate, useParams } from "react-router-dom";
import { getTestById, submitTest } from "../../api/service/TestService";
import { setTest } from "../../redux/reducer/StartTestReducer";
import getUser from "../../helper/User";
import Swal from "sweetalert2";
import "./css/Start.css";

const TestStart = () => {
    const testId = useParams().id;
    const [time, setTime] = useState("120:00");
    const questionSelected = useSelector(state => state.question.questionSelected);
    const part = useSelector(state => state.question.part);
    const test = useSelector(state => state.startTest.test);
    const sectionQuestion = useSelector(state => state.question.sectionQuestion);
    const dispatch = useDispatch(); 
    const navigation = useNavigate();
    const countdownRef = useRef(null);
    console.log(sectionQuestion);
    const hnadleSelectQuestion = (id) => {
        dispatch(setQuestionSelected(id));
        const indexQuestiion = sectionQuestion[part-1].questionIds.findIndex((question) => question.id == id);
        if(indexQuestiion !== -1){
          return;
        }else{
            const partContainsQuestion = sectionQuestion.find((part) => part.questionIds.findIndex((question) => question.id === id) !== -1);
            dispatch(setPart(partContainsQuestion.id));
        }
        
        
       
    };


    // Fetch test data
    const fetchTest = useCallback(async () => {
        try {
            const response = await getTestById(testId);
            dispatch(setTest(response));
            dispatch(setParts(response?.parts));
            dispatch(setPart(1));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, testId]);

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    // Handle countdown timer
    useEffect(() => {
        const updateTime = () => {
            const timeArray = time.split(':');
            let minutes = parseInt(timeArray[0], 10);
            let seconds = parseInt(timeArray[1], 10);
            seconds--;
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }
            if (minutes < 0) {
                clearInterval(countdownRef.current);
            } else {
                setTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
            }
        };

        countdownRef.current = setInterval(updateTime, 1000);
        return () => clearInterval(countdownRef.current);
    }, [time]);

    // Handle part selection
    const handleSelectPart = useCallback((part) => {
        dispatch(setPart(part));
    }, [dispatch]);

    // Get CSS class for question cell based on answer ID
    const handleGetClassCellByAnswerId = useCallback((answerId) => {
        return answerId === -1 ? "question-cell" : "question-cell-selected";
    }, []);

    // Submit test
    const handleSubmitTest = async () => {
        const { value: confirmed } = await Swal.fire({
            title: 'Nộp bài',
            text: "Bạn có chắc chắn muốn nộp bài không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#37B7C3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        });

        if (confirmed) {
            try {
                const email = await getUser().email;
                const answerQuestionDTOS = sectionQuestion.flatMap(part =>
                    part.questionIds.map(question => ({
                        idPart: part.id,
                        idQuestion: question.id,
                        idAnswer: question.answerId
                    }))
                );

                const response = await submitTest(email, testId, time, answerQuestionDTOS);
                navigation(`/test/result/${response.id}`);
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra!',
                });
            }
        }
    };

    return (
        <Layout>
            <div className="test-page-container">
                <h1 className="test-title">{Test1.name}</h1>
                <div className="test-container">
                    <div className="test-content-container">
                        {test.mp3 && <audio controls src={test.mp3} className="test-audio"></audio>}
                        <div className="test-part-buttons">
                            {test?.parts?.map(item => (
                                <Button
                                    key={item.id}
                                    variant="contained"
                                    className={part === item.id ? "btn-part-select" : "btn-part"}
                                    onClick={() => handleSelectPart(item.id)}
                                >
                                    Part {item.id}
                                </Button>
                            ))}
                        </div>
                        <div className="test-part-content">
                            <Part number={part} />
                        </div>
                    </div>
                    <div className="test-select-cell-container">
                        <Button
                            variant="contained"
                            className="btn-submit-test"
                            onClick={handleSubmitTest}
                        >
                            NỘP BÀI <FontAwesomeIcon icon={faCheck} className="btn-submit-icon" />
                        </Button>
                        <div className="test-timer">
                            Còn lại: <h3>{time}</h3>
                        </div>
                        <hr />
                        {sectionQuestion.map(part => (
                            <div key={part.id} className="test-question-section">
                                <h4>{part.name}</h4>
                                <div className="test-question-cells">
                                    {part.questionIds.map(item => (
                                        <div
                                            key={item.id}
                                            className={questionSelected === item.id ? "question-cell-current" : handleGetClassCellByAnswerId(item.answerId)}
                                            onClick={() => hnadleSelectQuestion(item.id)}
                                        >
                                            {item.id}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TestStart;
