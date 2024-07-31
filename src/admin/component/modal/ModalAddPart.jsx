import {  Modal} from "react-bootstrap";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addPartToTest } from "../../../api/service/TestService";
import { addPart } from "../../../redux/reducer/AddPartReducer";
import Swal from "sweetalert2";

export default function AddPartModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("READING");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const parts = useSelector((state) => state.addPart.parts);
  const idTest = useParams().id;
  const nextIdPart = parts.length + 1;
  const navigate = useNavigate();
 

  const handleCreatePart = async () => {
    setLoading(true);
    try {
      const response = await addPartToTest(idTest,name,Number.parseFloat(score),type);
      dispatch(addPart(response));
      setLoading(false);
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Tạo phần thi thành công",
      });
      navigate(
        "/admin/test/" + idTest + "/part/" + nextIdPart +"/"+name+ "/add-question"
      );
    } catch (e) {
      console.error(e);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Tạo phần thi thất bại",
      })
    }
  }
  


  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>TẠO PHẦN THI MỚI</h3>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            label="Tên phần thi"
            variant="standard"
            fullWidth
            style={{ flex: 1, marginBottom: 20 }}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl>
            <Label sx={{ color: "action.active", mr: 1, my: 0.5 }}>Loại</Label>
            <Select
              fullWidth
              label="loại"
              onChange={(e) => setType(e.target.value)}
              value={type}
              >
              <MenuItem value={"READING"}>READING</MenuItem>
              <MenuItem value={"LISTENING"}>LISTENING</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Số điểm mỗi câu"
            variant="standard"
            fullWidth
            style={{ flex: 1, marginBottom: 20 }}
            type="number"
            onChange={(e) => setScore(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={handleCreatePart}> 
            {loading ? "Loading..." : "Tạo phần thi"}
          </Button>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
