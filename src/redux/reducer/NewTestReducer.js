import { createSlice } from "@reduxjs/toolkit";

const NewTestReducer = createSlice({
  name: "NewTestReducer",
  initialState: {
    name: "",
    description: "",
    time: 0,
    typeTest: "",
    mp3: "",
  },
  reducers: {
    setNameNewReducer: (state, action) => {
      state.name = action.payload;
    },
    setDescriptionNewReducer: (state, action) => {
      state.description = action.payload;
    },
    setTimeNewReducer: (state, action) => {
      state.time = action.payload;
    },
    setTypeTestNewReducer: (state, action) => {
      state.typeTest = action.payload;
    },
    setMp3NewReducer: (state, action) => {
      state.mp3 = action.payload;
    },
  },
});

export const { setTests, setPage, setLimit, setTest } = NewTestReducer.actions;
export default NewTestReducer.reducer;
