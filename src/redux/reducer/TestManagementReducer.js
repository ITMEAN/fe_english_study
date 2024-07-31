import { createSlice } from "@reduxjs/toolkit";

const TestManagementReducer = createSlice({
    name: "TestManagement",
    initialState: {
       tests: [],
       page: 1,
       limit: 10,
       test: null,
    },
    reducers: {
        setTests : (state, action) => {
            state.tests = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setTest: (state, action) => {
           state.test = action.payload;
        }
        
        
    },
});

export const {setTests,setPage,setLimit ,setTest} = TestManagementReducer.actions
export default TestManagementReducer.reducer;