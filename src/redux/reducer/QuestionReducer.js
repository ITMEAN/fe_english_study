import { createSlice } from "@reduxjs/toolkit";

const QuestionReducer = createSlice({
    name: "question",
    initialState: {
        user: {},
        questions: [],
        questionGroups: [],
        questionSelected: 1,
        part: 1,
        answers: [],
        parts:[],
        questionIds: [],
        sectionQuestion: [],

    },
    reducers: {
        setQuestionRef: (state, action) => {
            console.log(action.payload);
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setQuestionSelected: (state, action) => {
            state.questionSelected = action.payload;
            

        },
        setPart: (state, action) => {
            state.part = action.payload;
            state.questions =  state.parts.find((part) => part.id === action.payload).questions;
            state.questionGroups = state.parts.find((part) => part.id === action.payload).questionGroups;
        },
        setParts: (state, action) => {
            state.parts = action.payload;
            const Ids = action.payload.map((part) => 
                part.questions.map((question) => question.id)
                .concat(part.questionGroups.map((group) => group.questions.map((question) => question.id))).flat()
        ).flat();
            state.questionIds = Ids;
            state.sectionQuestion = action.payload.map((part) => {
                return {
                    id: part.id,
                    name: part.name,
                    questionIds: 
                    part.questions.map((question) => ({id: question.id, partId: part.id, answerId: -1}))
                    .concat(part.questionGroups.map((group) => group.questions.map((question) => ({id: question.id, partId: part.id, answerId: -1}))).flat())
                    .flat()
                }
            });

        },
        selectAnswer: (state, action) => {
           const indexPart = state.sectionQuestion.findIndex((part) => part.id === action.payload.partId);
           const indexQuestion = state.sectionQuestion[indexPart].questionIds.findIndex((question) => question.id === action.payload.questionId);
           if(indexQuestion !== -1){
                 state.sectionQuestion[indexPart].questionIds[indexQuestion].answerId = action.payload.answerId;
            }
        },
        
    },
});

export const { setQuestionRef, setQuestions, setQuestionSelected,setPart,selectAnswer,setParts } = QuestionReducer.actions;
export default QuestionReducer.reducer;