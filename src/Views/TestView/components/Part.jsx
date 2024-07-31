import React, { useEffect, useRef, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import '../css/Start.css';
import Question from "./Question";

// Lazy load Question component


export default function Part(props) {
    const refQuestion = useRef(null);
    const questtionSelected = useSelector(state => state.question.questionSelected);
    const questions = useSelector(state => state.question.questions);
    const questionGroups = useSelector(state => state.question.questionGroups);

    useEffect(() => {
        if (questtionSelected !== undefined) {
            refQuestion.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [questtionSelected]);

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column',gap:10 }} key={props.number}>
            <h1>Part {props.number}</h1>
            <Suspense fallback={<div>Loading questions...</div>}>
                {questions.map((item, index) => (
                    <div key={item.id}>
                        <div ref={questtionSelected === item.id ? refQuestion : null}>
                            <Question index={index} item={item} partId={props.number} />
                        </div>
                    </div>
                ))}
                {questionGroups.map((item, index) => (
                    <div className="combo-question-container" key={index}>
                        <img src={item.image} alt="combo" className="image-combo-question" />
                        <div className="combo-question-list-question">
                            {item.questions.map((qs, index) => (
                                <div key={qs.id} ref={questtionSelected === qs.id ? refQuestion : null}>
                                    <Question index={index} item={qs} partId={props.number} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Suspense>
        </div>
    );
}
