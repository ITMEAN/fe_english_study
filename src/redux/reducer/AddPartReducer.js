import { createSlice } from "@reduxjs/toolkit";

const AddPartReducer = createSlice({
  name: "AddPartReducer",
  initialState: {
    partName: "",
    idTest: "",
    parts: [],
    partSelected: "",
    
  },
  reducers: {
    setPartName: (state, action) => {
      state.partName = action.payload;
    },
    setIdTest: (state, action) => {
      state.idTest = action.payload;
    },
    setParts: (state, action) => {
      state.parts = action.payload;
    },
    addPart: (state, action) => {
        console.log(action.payload);
      state.parts.push(action.payload);
    },
    setPartSelected: (state, action) => {
      state.partSelected = action.payload;
    },
    addQuestionToPart: (state, action) => {
        const { idPart, question } = action.payload;
        const part = state.parts.find((item) => item.id === idPart);
         part.questions.push(question);
    },
    addComboQuestionToPart: (state, action) => {
        const { idPart, comboQuestion } = action.payload;
        const part = state.parts.find((item) => item.id === idPart);
        console.log(part);
        part.comboQuestion.push(comboQuestion);
    },
    removeQuestionFromPart: (state, action) => {
        const {idPart, idQuestion} = action.payload;
        const part = state.parts.find((item) => item.id === idPart);
        part.questions = part.questions.filter((item) => item.id !== idQuestion);
    },
  },
});

export const { setPartName, setIdTest, setParts,addPart,setPartSelected,addQuestionToPart,addComboQuestionToPart,removeQuestionFromPart} = AddPartReducer.actions;
export default AddPartReducer.reducer;
