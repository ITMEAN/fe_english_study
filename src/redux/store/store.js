import { combineReducers, createStore } from "@reduxjs/toolkit";
import QuestionReducer from "../reducer/QuestionReducer";
import RegisterReducer from "../reducer/RegisterReducer";
import UserReducer from "../reducer/UserReducer";
import TestManagementReducer from "../reducer/TestManagementReducer";
import NewTestReducer from "../reducer/NewTestReducer";
import AddPartReducer from "../reducer/AddPartReducer";
import StartTestReducer from "../reducer/StartTestReducer";
import ResultReducer from "../reducer/ResultReducer";
import FlashCardReducer from "../reducer/FlashCardReducer";

const rootReducer = combineReducers({
     question: QuestionReducer,
     register: RegisterReducer,
     user: UserReducer,
     testManagement: TestManagementReducer,
     newTest: NewTestReducer,
     addPart: AddPartReducer,
     startTest:StartTestReducer,
     result:ResultReducer,
     flashCard: FlashCardReducer,
});

const store = createStore(rootReducer);
export default store;