import {Modal } from "react-bootstrap";
import {
  Button,
  TextField,
} from "@mui/material";
import React, {  useState } from "react";
import { forgotPassword} from "../../../api/service/AuthService";
import Swal from "sweetalert2";

export default function ModalForgotPassWord({
  show,
  handleClose
}) {

const [email,setEmail]=useState("");
const [loading,setLoading]=useState(false);
const handleResetPassword=async()=>{
    try{
        setLoading(true);
        const response = await forgotPassword(email);
        Swal.fire({
        title: "Good job!",
        text: "Đã gửi lại email",
        icon: "success"
        });
        handleClose();
    }catch(error){
        console.log(error);
    }
    setLoading(false);
}

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
         <TextField variant="standard" label="Email" fullWidth placeholder="nhập email" onChange={(e)=>setEmail(e.target.value)}/>
            <Button
                variant="contained"
                fullWidth
                style={{ marginTop: "20px" }}
                onClick={handleResetPassword}>

             {loading ? "Đang gửi" : "Gửi lại email"}
            </Button>
      </Modal.Body>
    </Modal>
  );
}
