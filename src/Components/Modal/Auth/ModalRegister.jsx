import {  Modal, Row } from "react-bootstrap";
import { Alert, Box, Button, InputAdornment, TextField } from "@mui/material";
import { AccountBox, Check, Email, Lock } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../../../redux/reducer/RegisterReducer";
import { register } from "../../../api/service/AuthService";

export default function RegisterModal({
  show,
  handleClose,
  handleShowModalLogin,
  handleShowRegisterValidOTP,
}) {
  const dispatch = useDispatch();
  // error message
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  // input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // validate
  const validateEmail = (email) => {
    if (email.length === 0) {
      setErrorEmail("Email không được để trống");
      return false;
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorEmail("Email không hợp lệ");
      return false;
    } else {
      setErrorEmail("");
      return true;
    }
  };
  const validateName = (name) => {
    if (name.length === 0) {
      setErrorName("Tên không được để trống");
      return false;
    } else {
        setErrorName("");
      return true;
    }
  }; 

  const validatePassword = (password) => {
    if (password.length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 kí tự");
      return false;
    } else {
      setErrorPassword("");
      return true;
    }
  };
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setErrorConfirmPassword("Mật khẩu không trùng khớp");
      return false;
    } else {
      setErrorConfirmPassword("");
      return true;
    }
  };
  const handleSetEmail = (email) => {
    validateEmail(email);
    setEmail(email);
  };

  const handleSetName = (name) => {
    validateName(name);
    setName(name);
    };

  const handleSetPassword = (password) => {
    validatePassword(password);
    setPassword(password);
  };

  const handleSetConfirmPassword = (confirmPassword) => {
    validateConfirmPassword(confirmPassword);
    setConfirmPassword(confirmPassword);
  };

  const handleRegister =async () => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
      &&
       validateName(name)
    ) {
     
      try{
        const response = await register(password,confirmPassword,email,name);
        <Alert icon={<Check/>} severity="success">
            Here is a gentle confirmation that your action was successful.
        </Alert>
        dispatch(setAccount({email:email}));
        handleShowRegisterValidOTP();
        
      }catch(error){
        if(error.response.status === 409){
          setErrorEmail("Email đã tồn tại");
        }
      }
     
    }
  };

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>ĐĂNG KÝ</h3>
        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
          <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            onChange={(e) => handleSetEmail(e.target.value)}
            helperText={errorEmail}
            error={errorEmail !== ""}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
          <AccountBox sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            label="Họ và tên"
            variant="standard"
            fullWidth
            onChange={(e) => handleSetName(e.target.value)}
            helperText={errorName}
            error={errorName !== ""}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
          <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            fullWidth
            id="outlined-adornment-password"
            type="password"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Mật khẩu"
            onChange={(e) => handleSetPassword(e.target.value)}
            helperText={errorPassword}
            error={errorPassword !== ""}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            fullWidth
            id="outlined-adornment-password"
            type="password"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Nhập lại mật khẩu"
            onChange={(e) => handleSetConfirmPassword(e.target.value)}
            helperText={errorConfirmPassword}
            error={errorConfirmPassword !== ""}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }} marginTop={1}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#37B7C3" }}
            onClick={handleRegister}>
            Đăng ký
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }} marginTop={1}>
          <h6>
            Đã có tài khoản ?{" "}
            <Button
              variant="text"
              style={{ color: "#37B7C3" }}
              onClick={handleShowModalLogin}>
              Đăng nhập
            </Button>
          </h6>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
