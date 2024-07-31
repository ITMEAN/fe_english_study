import requestApi from "../request"

export const register = async (password,rePassword,email,fullName) => {
    try{
        const response = await requestApi("/auth/register", "POST", {password,rePassword,email,fullName}, false, "application/json");
        return response;
    }catch(error){
       return Promise.reject(error);
    }
}


export const validateOTP = async (email,otp) => {
    try{
        const response = await requestApi("/auth/validate-otp-register", "POST", {email,otp}, false, "application/json");
        return response;
    }catch(error){
       console.log(error);
       return Promise.reject(error);
    }
}

export const resendOTP = async (email) => {
    try{
        const response = await requestApi("/auth/resend-otp/"+email, "GET", null, false, "application/json");
        return response;
    }catch(error){
       console.log(error);
       return Promise.reject(error);
    }
}

export const login = async (email,password) => {
    try{
        const response = await requestApi("/auth/login", "POST", {email,password}, false, "application/json");
        return response;
    }catch(error){
       return Promise.reject(error);
    }
}

export const forgotPassword = async (email) => {
    try{
        const response = await requestApi("/auth/forgot-password/"+email, "GET", null, false, "application/json");
        return response;
    }catch(error){
       return Promise.reject(error);
    }
}

export const resetPassaword = async (email,password,rePassword,token) => {
    try{
        const response = await requestApi("/auth/reset-password", "POST", {email,token,password,rePassword}, false, "application/json");
        return response;
    }catch(error){
       return Promise.reject(error);
    }
}