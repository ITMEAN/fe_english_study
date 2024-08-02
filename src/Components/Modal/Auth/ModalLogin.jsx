import {  Modal } from "react-bootstrap";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,

  TextField,
} from "@mui/material";
import {
  Email,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useState } from "react";
import { login } from "../../../api/service/AuthService";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducer/UserReducer";
import { Link, useNavigate } from "react-router-dom";

export default function LoginModal({ show, handleClose ,handleShowModalRegister,handleShowModalForgotPassword}) {
  const URL_LOGIN = "http:/lsrc.me:8081/oauth2/authorization/google";
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = () => setChecked((checked) => !checked);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [errorLogin, setErrorLogin] = useState(false);
  const dispatch = useDispatch();
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  const handleLogin = async () => {
    try{
      const response =  await login(email,password);
      const user = {
        "email":response?.email,
        "fullName":response?.fullName,
        "roles":response?.roles,
      }
      const token = response?.token;
      console.log(token);
      const refreshToken = response?.refresh_token;
      console.log(refreshToken);
      localStorage.setItem("token",token);
      localStorage.setItem("refreshToken",refreshToken);
      localStorage.setItem("user",JSON.stringify(user));
      dispatch(setUser(user));
      handleClose();
      window.location.reload();
    }catch(error){
      console.log(error);
      setErrorLogin("Email hoặc mật khẩu không chính xác")
    }
  };




  return (
    <Modal show={show} centered onHide={handleClose} >
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h3>
        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
          <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField label="Email" variant="standard" fullWidth  
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            fullWidth
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end",width:'100%' }} >
            {errorLogin && <p style={{color:'red'}}>Email hoặc mật khẩu không chính xác</p>}
         </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end",width:'100%' }} >
            <Button variant="text" style={{color:'#37B7C3'}} onClick={handleShowModalForgotPassword}>Quên mật khẩu?</Button>
         </Box>
         
        <FormControlLabel
          label="Ghi nhớ đăng nhập"
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
            />
          }
          style={{ marginTop: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }} marginTop={1}>
            <Button variant="contained" style={{backgroundColor:'#37B7C3'}} onClick={handleLogin}>Đăng nhập</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }} marginTop={1}>
           <h6>Hoặc</h6>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center",gap:'5px' }} marginTop={1}>
        <Box>
            <Link to={URL_LOGIN} sx={{ display: "flex", justifyContent: "center",gap:'5px' }} marginTop={1}>
                <Button variant="contained" style={{backgroundColor:'#DC3545'}}><Google/> Đăng nhập với google</Button>
            </Link>
            
         </Box>
       
      </Box>
       
            
        <Box sx={{ display: "flex", justifyContent: "center",gap:'5px' }} marginTop={1}>
            <h6>Bạn chưa có tài khoản? <Button variant="text" style={{color:'#37B7C3'}} onClick={handleShowModalRegister}>Đăng ký</Button></h6>
        </Box> 
      </Modal.Body>
    </Modal>
  );
}
