import { createSlice } from "@reduxjs/toolkit";

const StartTest = createSlice({
    name: "statTest",
    initialState: {
       test: {},
    },
    reducers: {
      setTest:(state,action)=>{
         state.test=action.payload;
      }
    },
});

export const {setTest} = StartTest.actions
export default StartTest.reducer;