import { createSlice } from "@reduxjs/toolkit";

const RegisterReducer = createSlice({
    name: "question",
    initialState: {
       account: {},
       isValidOTP: false,

    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setIsValidOTP: (state, action) => {
            state.isValidOTP = action.payload;
        },
        
    },
});

export const {setAccount,setIsValidOTP } = RegisterReducer.actions;
export default RegisterReducer.reducer;