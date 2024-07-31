import { createSlice } from "@reduxjs/toolkit";

const ResultReducer = createSlice({
    name: "ResultReducer",
    initialState: {
      result: {},

    },
    reducers: {
        setResult:(state,action)=>{
             state.result=action.payload;
        }
        
    },
});

export const {setResult } = ResultReducer.actions;
export default ResultReducer.reducer;