import {Modal } from "react-bootstrap";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import React, {  useState } from "react";
import { useSelector } from "react-redux";
import { resendOTP, validateOTP } from "../../../api/service/AuthService";
import Swal from "sweetalert2";

export default function RegisterValidOTP({
  show,
  handleClose
}) {

 const [otp, setOtp] = useState("");
 const [time, setTime] = useState(60);
 const [errorOTP, setErrorOTP] = useState("");
 const account = useSelector((state) => state.register.account);
 
 const handleValidateOTP = async () => {
   try{
    const response = await validateOTP(account.email, otp);
    Swal.fire({
      title: "Good job!",
      text: "Đăng ký thành công. bạn có thể đăng nhập ngay bây giờ",
      icon: "success"
    });
    handleClose();
   }catch(error){
      if(error.response.status === 400 && error.response.data === "Invalid"){
        setErrorOTP("Mã OTP không chính xác");
      }else if(error.response.status === 400 && error.response.data === "expired"){
        setErrorOTP("Mã OTP đã hết hạn");
      }else{
        setErrorOTP("Lỗi không xác định");
      }
   }
}

const handleResendOTP = async () => {
    try{
      const response = await resendOTP(account.email);
      Swal.fire({
        title: "Good job!",
        text: "Đã gửi lại email",
        icon: "success"
      });
      setTime(60);
      setErrorOTP("");
    }catch(error){
      console.log(error);
}
}

 

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>Xác thực OTP email</h3>
        <p style={{ textAlign: "center" }}>Mã OTP đã được gửi đến email:  {account.email}</p>
        <Box sx={{ display: "flex", alignItems: "flex-end",flexDirection:'row' }} marginBottom={2}>
          <TextField
            label="Nhập Mã OTP"
            variant="standard"
            onChange={(e) => setOtp(e.target.value)}
            helperText={errorOTP}
            error={errorOTP !== ""}
          />
          <Button variant="contained" style={{backgroundColor:'#37B7C3',marginLeft:10}} onClick={handleValidateOTP}>XÁC THỰC</Button>
          <Button variant="text" style={{backgroundColor:'#FFF078',marginLeft:10}} onClick={handleResendOTP}>GỬI LẠI</Button>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
