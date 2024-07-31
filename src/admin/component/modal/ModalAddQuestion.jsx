import {  Modal, Table } from "react-bootstrap";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AddOptionModal from "./ModalAddOption";

export default function AddQuenstionModal({
  show,
  handleClose,
  testId,
  partId,
}) {
  const [hideQuestion, setHideQuestion] = useState(true);
  const [hideAnswer, setHideAnswer] = useState(true);
  const [showModalAddOption, setShowModalAddOption] = useState(false);
  const [option, setOption] = useState("");
  const handleShowModalAddOption = () => {
    setShowModalAddOption(true);
  };
  const [nextIdOption, setNextIdOption] = useState(1);
  const [options, setOptions] = useState([]);
  const idOptionToAlphabet = (id) => {
    return String.fromCharCode(65 + id);
  };
  const handleAddOption = (option) => {
   
    setOptions([...options, option]);
  }
  
  console.warn(options);
  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>Thêm Câu hỏi</h3>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Mô tả"
            variant="standard"
            fullWidth
            style={{ flex: 1, marginBottom: 20 }}
          />
          <Input type="file" fullWidth style={{ flex: 1, marginBottom: 20 }} />
          <FormControl>
            <FormLabel>Ẩn nội dung câu hỏi</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={hideQuestion}
              onChange={(e) => setHideQuestion(e.target.value)}
              style={{ flexDirection: "row" }}>
              <FormControlLabel value={true} control={<Radio />} label="Ẩn" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Hiện"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Ẩn nội dung lựa chọn</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={hideAnswer}
              onChange={(e) => setHideAnswer(e.target.value)}
              style={{ flexDirection: "row" }}>
              <FormControlLabel value={true} control={<Radio />} label="Ẩn" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Hiện"
              />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ flexDirection: "row" }}>
            <TextField label="nhập nội dung lựa chọn"
            onChange={(e) => setOption(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              style={{}}
              onClick={() => handleAddOption(option)}>
              Thêm câu trả lời
            </Button>
          </FormControl>
          <Table striped responsive  bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Mô tả</th>
                    <th>Đúng</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Đáp án 1</td>
                    <td>
                        <Radio />
                    </td>
                    <td>
                        <Button variant="contained">Sửa</Button>
                        <Button variant="contained">Xóa</Button>
                    </td>
                    </tr>
                </tbody>
            </Table>
        </Box>
        <Button variant="primary" style={{ marginTop: 20 }}>
          Thêm câu hỏi
        </Button>
      </Modal.Body>
      <AddOptionModal
        show={showModalAddOption}
        handleClose={() => setShowModalAddOption(false)}
      />
    </Modal>
  );
}
