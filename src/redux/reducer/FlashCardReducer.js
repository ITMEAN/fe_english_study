import { createSlice } from "@reduxjs/toolkit";

const FlashCardReducer = createSlice({
  name: "FlashCardReducer",
  initialState: {
    flashCards: [],
    listVocabularyUpdated: [],
    listVocabularyInserted: [],
    listVocabularyRemvoed: [],
    flashCardSelected: {},
    flashCardSelectedIndex: 0,
    listVocabulary:[],
  },
  reducers: {
    setListVocabulary: (state, action) => {
      console.log(action.payload);
      state.listVocabulary = action.payload;
    },
    setFlashCards: (state, action) => {
      state.flashCards = action.payload;
    },
    addFlashCard: (state, action) => {
      state.flashCards.push(action.payload);
    },
    setFlashCardSelected: (state, action) => {
      state.flashCardSelected = action.payload;
    },
    setFlashCardSelectedIndex: (state, action) => {
      state.flashCardSelectedIndex = action.payload;
    },
    addVocabulary: (state, action) => {
        state.listVocabularyInserted.push(action.payload);
        state.flashCardSelected.vocabularies.push(action.payload);
    },
    removeVocabulary: (state, action) => {
        const index = state.listVocabulary.findIndex((item) => item.id === action.payload.vocabulary.id);
        if (index !== -1) {
            state.listVocabularyRemvoed.push(action.payload.vocabulary.id);
        }
        const indexInserted = state.listVocabularyInserted.findIndex((item) => item.id === action.payload.vocabulary.id);
        if (indexInserted !== -1) {
            state.listVocabularyInserted = state.listVocabularyInserted.filter((item) => item.id !== action.payload.vocabulary.id);
        }
        state.flashCardSelected.vocabularies = state.flashCardSelected.vocabularies.filter((item) => item.id !== action.payload.vocabulary.id);

    },
    updateVocabulary: (state, action) => {
        state.listVocabularyUpdated.push(action.payload);
        state.flashCardSelected.vocabulary = state.flashCardSelected.vocabulary.map((item) => item.id === action.payload.id ? action.payload : item);
    },
    resetVocabulary: (state) => {
        state.listVocabularyInserted = [];
        state.listVocabularyRemvoed = [];
        state.listVocabularyUpdated = [];
    },
  },
});

export const {
  setFlashCards,
  addFlashCard,
  setFlashCardSelected,
  setFlashCardSelectedIndex,
    addVocabulary,
    removeVocabulary,
    updateVocabulary,
    resetVocabulary,
    setListVocabulary,
} = FlashCardReducer.actions;

export default FlashCardReducer.reducer;
