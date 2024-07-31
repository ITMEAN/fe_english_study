import LayoutAdmin from "../LayoutAdmin";
import React, { useEffect, useState } from "react";
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
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addComboQuestionToPart,
  addPart,
  addQuestionToPart,
  removeQuestionFromPart,
} from "../../redux/reducer/AddPartReducer";
import ButtonDelete from "../component/button/ButtonDelete";
import ButtonEdit from "../component/button/ButtonEdit";
import {
  addComboQuestion,
  addQuestion,
} from "../../api/service/TestService";
import Swal from "sweetalert2";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";

export default function AddQuestionPage() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [comboQuestions, setComboQuestions] = useState([]);
  const [hideQuestion, setHideQuestion] = useState(true);
  const [hideAnswer, setHideAnswer] = useState(true);
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [nextIdOption, setNextIdOption] = useState(1);
  const [correctOption, setCorrectOption] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [typeQuestion, setTypeQuestion] = useState("single");
  const [idComboQuestionOpen, setIdComboQuestionOpen] = useState([0]);

  const dispatch = useDispatch();
  const handleAddOption = (option) => {
    setOptions([...options, { id: nextIdOption, content: option }]);
    setNextIdOption(nextIdOption + 1);
  };
  const idPart = useParams().idpart;
  const idtest = useParams().idtest;
  const name = useParams().name;
  const parts = useSelector((state) => state.addPart.parts);
  const part = parts.find((part) => part.id == idPart);
  const questions = part?.questions;
  const comboQuestion = part?.comboQuestion;
  const [imageParagraph, setImageParagraph] = useState(null);
  const handleChangeCorrectOption = (index) => {
    setCorrectOption(index);
  };
  useEffect(() => {
    dispatch(
      addPart({ id: idPart, name: name, questions: [], comboQuestion: [] })
    );
  }, []);
  console.warn(part);

  const handleAddComboQuestion = () => {
    const comboQuestion = {
      image: imageParagraph,
      questions: comboQuestions,
    };
    dispatch(addComboQuestionToPart({ idPart, comboQuestion }));
    resetState();
  };
  const resetState = () => {
    setOption("");
    setOptions([]);
    setNextIdOption(1);
    setCorrectOption(1);
    setDescription("");
    setImage(null);
    setComboQuestions([]);
    setImageParagraph(null);
  };

  const handleAddQuestion = () => {
    const question = {
      id: nextIdOption,
      description: description,
      options: options,
      correctOption: correctOption,
      hideQuestion: hideQuestion,
      hideAnswer: hideAnswer,
      image: image,
    };
    if (typeQuestion === "single") {
      dispatch(addQuestionToPart({ idPart, question }));
      resetState();
    } else {
      setComboQuestions([...comboQuestions, question]);
      setDescription("");
      setImage(null);
      setDescription("");
      setOptions([]);
    }
  };

  const handleRemoveQuestion = (id) => {
    dispatch(removeQuestionFromPart({ idPart, idQuestion: id }));
  };

  const handleSavePart = async () => {
    try {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        try {
          console.error("question", question);
          const response = await addQuestion(
            idPart,
            idtest,
            question.description,
            question.options,
            question.image,
            question.correctOption,
            question.hideQuestion,
            question.hideAnswer
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

      for (let i = 0; i < comboQuestion.length; i++) {
        try {
          const combo = comboQuestion[i];
          const response = await addComboQuestion(
            idPart,
            idtest,
            combo.image,
            combo.questions
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

      Swal.fire({
        icon: "success",
        title: "Lưu thành công",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Lưu thất bại",
      });
    }
  };

  const checkOpen = (id) => {
    return idComboQuestionOpen.includes(id);
  };

  const handleOpenComboQuestion = (id) => {
    if (idComboQuestionOpen.includes(id)) {
      setIdComboQuestionOpen(idComboQuestionOpen.filter((item) => item !== id));
    } else {
      setIdComboQuestionOpen([...idComboQuestionOpen, id]);
    }
  };

  const handleDeleteAllOption = () => {
    setOptions([]);
  };

  return (
    <LayoutAdmin>
      <div style={containerStyle}>
        <Box sx={isDesktopOrLaptop ? leftPanelStyle : leftPanelMobileStyle}>
          <FormControl>
            <FormLabel>Loại câu hỏi</FormLabel>
            <RadioGroup
              value={typeQuestion}
              onChange={(e) => setTypeQuestion(e.target.value)}
              style={radioGroupStyle}>
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="Đơn"
              />
              <FormControlLabel
                value="multiple"
                control={<Radio />}
                label="Nhiều"
              />
            </RadioGroup>
          </FormControl>
          {/* desciption */}
          <TextField
            label="Mô tả"
            variant="standard"
            fullWidth
            style={{ marginBottom: 20 }}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* image */}

          <Input
            type="file"
            fullWidth
            style={{ marginBottom: 20 }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* hide question */}
          <FormControl>
            <FormLabel>Ẩn nội dung câu hỏi</FormLabel>
            <RadioGroup
              value={hideQuestion}
              onChange={(e) => setHideQuestion(e.target.value)}
              style={radioGroupStyle}>
              <FormControlLabel value={true} control={<Radio />} label="Ẩn" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Hiện"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            {/* hide answer */}
            <FormLabel>Ẩn nội dung lựa chọn</FormLabel>
            <RadioGroup
              value={hideAnswer}
              onChange={(e) => setHideAnswer(e.target.value)}
              style={radioGroupStyle}>
              <FormControlLabel value={true} control={<Radio />} label="Ẩn" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Hiện"
              />
            </RadioGroup>
          </FormControl>
          {/* option */}
          <FormControl
            style={{
              display: "flex",
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <TextField
              label="Nhập nội dung lựa chọn"
              onChange={(e) => setOption(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => handleAddOption(option)}
              style={{ marginLeft: 10 }}>
              Thêm câu trả lời
            </Button>
            <ButtonDelete
              variant="contained"
              onClick={handleDeleteAllOption}
              style={{ marginLeft: 10 }}>
              Xóa tất cả
            </ButtonDelete>
          </FormControl>
          <div style={{ overflow: "auto", maxHeight: 200 }}>
            <Table striped responsive bordered hover variant="dark">
              <thead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Đúng</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </thead>
              <tbody>
                {options.map((option, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{option?.content}</TableCell>
                    <TableCell>
                      <Radio
                        checked={correctOption === index + 1}
                        onClick={() => handleChangeCorrectOption(index + 1)}
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonEdit variant="contained">Sửa</ButtonEdit>
                      <ButtonDelete variant="contained">Xóa</ButtonDelete>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={handleAddQuestion}>
            Thêm câu hỏi
          </Button>
        </Box>
        {/* mid panel */}
        {typeQuestion === "multiple" && (
          <Box sx={midPanelStyle}>
            <h4>Thêm nhóm câu hỏi</h4>
            <FormControl>
              <FormLabel>Ảnh đoạn văn</FormLabel>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageParagraph(e.target.files[0])}
                />
                {imageParagraph && (
                  <img
                    src={URL.createObjectURL(imageParagraph)}
                    style={{ width: 50, height: 50 }}
                  />
                )}
              </Box>
            </FormControl>
            <Table
              sx={{ height: "70%" }}
              striped
              responsive
              bordered
              hover
              variant="dark">
              <thead>
                <TableRow sx={{ backgroundColor: "#071952", color: "white" }}>
                  <TableCell>#</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Ản câu hỏi</TableCell>
                  <TableCell>Ẩn lựa chọn</TableCell>
                  <TableCell>Đáp án</TableCell>
                  <TableCell>Lựa chọn 1</TableCell>
                  <TableCell>Lựa chọn 2</TableCell>
                  <TableCell>Lựa chọn 3</TableCell>
                  <TableCell>Lựa chọn 4</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </thead>
              <tbody>
                {comboQuestions?.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{question.description}</TableCell>
                    <TableCell>
                      {question.hideQuestion ? "Ẩn" : "Hiện"}
                    </TableCell>
                    <TableCell>{question.hideAnswer ? "Ẩn" : "Hiện"}</TableCell>
                    <TableCell>{question.correctOption}</TableCell>
                    <TableCell>{question?.options[0]?.content}</TableCell>
                    <TableCell>{question?.options[1]?.content}</TableCell>
                    <TableCell>{question?.options[2]?.content}</TableCell>
                    <TableCell>{question?.options[3]?.content}</TableCell>
                    <TableCell>
                      <ButtonDelete variant="contained">Xóa</ButtonDelete>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <Button
              variant="contained"
              style={{ margin: 10 }}
              onClick={handleAddComboQuestion}>
              Thêm nhóm câu hỏi
            </Button>
          </Box>
        )}

        <Box
          sx={{
            rightPanelStyle,
            width:
              typeQuestion === "single"
                ? isDesktopOrLaptop
                  ? "69%"
                  : "100%"
                : "100%",
            backgroundColor: "white",
          }}>
          <h3 style={{ marginBottom: 0 }}>Danh sách câu hỏi</h3>
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={handleSavePart}>
            Lưu phần thi
          </Button>

          <Table striped responsive bordered hovered variant="dark">
            <thead>
              <TableRow sx={{ backgroundColor: "#071952", color: "white" }}>
                <TableCell>#</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Ản câu hỏi</TableCell>
                <TableCell>Ẩn lựa chợn</TableCell>
                <TableCell>Đáp án</TableCell>
                <TableCell>Lựa chọn 1</TableCell>
                <TableCell>Lựa chọn 2</TableCell>
                <TableCell>Lựa chọn 3</TableCell>
                <TableCell>Lựa chọn 4</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </thead>
            <tbody>
              {questions?.map((question, index) => (
                <TableRow key={index}>
                  <TableCell sx={tableCell}>{index + 1}</TableCell>
                  <TableCell sx={tableCell}>{question.description}</TableCell>
                  <TableCell sx={tableCell}>
                    {question.image && (
                      <img
                        src={URL.createObjectURL(question?.image)}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={tableCell}>
                    {question.hideQuestion ? "Ẩn" : "Hiện"}
                  </TableCell>
                  <TableCell sx={tableCell}>
                    {question.hideAnswer ? "Ẩn" : "Hiện"}
                  </TableCell>
                  <TableCell sx={tableCell}>{question.correctOption}</TableCell>
                  <TableCell sx={tableCell}>
                    {question?.options[0]?.content}
                  </TableCell>
                  <TableCell sx={tableCell}>
                    {question?.options[1]?.content}
                  </TableCell>
                  <TableCell sx={tableCell}>
                    {question?.options[2]?.content}
                  </TableCell>
                  <TableCell sx={tableCell}>
                    {question?.options[3]?.content}
                  </TableCell>

                  <TableCell>
                    <ButtonEdit variant="contained">Sửa</ButtonEdit>
                    <ButtonDelete
                      variant="contained"
                      onClick={() => handleRemoveQuestion(question.id)}>
                      Xóa
                    </ButtonDelete>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <h4>Nhóm câu hỏi đoạn văn</h4>
          <Table striped responsive bordered hover variant="dark">
            <thead>
              <TableRow sx={{ backgroundColor: "#071952", color: "white" }}>
                <TableCell></TableCell>
                <TableCell>#</TableCell>
                <TableCell>Ảnh đoạn văn</TableCell>
                <TableCell>Lựa chọn</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </thead>
            <tbody>
              {comboQuestion?.map((question, index) => (
                <React.Fragment>
                  <TableRow key={index}>
                    <TableCell>
                      {checkOpen(index) ? (
                        <KeyboardArrowUpSharp
                          onClick={() => handleOpenComboQuestion(index)}
                        />
                      ) : (
                        <KeyboardArrowDownSharp
                          onClick={() => handleOpenComboQuestion(index)}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={tableCell}>{index + 1}</TableCell>
                    <TableCell sx={tableCell}>
                      <img
                        src={URL.createObjectURL(question.image)}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell sx={tableCell}>{question.description}</TableCell>
                    <TableCell colSpan={8}>
                      <ButtonEdit variant="contained">Sửa</ButtonEdit>
                      <ButtonDelete variant="contained">Xóa</ButtonDelete>
                    </TableCell>
                  </TableRow>
                  {checkOpen(index) && (
                    <React.Fragment>
                      <TableRow
                        sx={{ backgroundColor: "#071952", color: "white" }}>
                        <TableCell>Mô tả</TableCell>
                        <TableCell>Ản câu hỏi</TableCell>
                        <TableCell>Ẩn lựa chợn</TableCell>
                        <TableCell>Đáp án</TableCell>
                        <TableCell>Lựa chọn 1</TableCell>
                        <TableCell>Lựa chọn 2</TableCell>
                        <TableCell>Lựa chọn 3</TableCell>
                        <TableCell>Lựa chọn 4</TableCell>
                      </TableRow>

                      {question.questions.map((item, index) => (
                        <TableRow key={index} row>
                          <TableCell sx={tableCell}>
                            {item.description}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item.hideQuestion ? "Ẩn" : "Hiện"}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item.hideAnswer ? "Ẩn" : "Hiện"}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item.correctOption}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item?.options[0]?.content}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item?.options[1]?.content}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item?.options[2]?.content}
                          </TableCell>
                          <TableCell sx={tableCell}>
                            {item?.options[3]?.content}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Box>
      </div>
    </LayoutAdmin>
  );
}
const containerStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
  gap: 10,
  flexDirection: "row",
  flexWrap: "wrap",
};

const leftPanelStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  paddingX: 5,
  width: "30%",
  backgroundColor: "white",
  maxHeight: "100%",
};
const leftPanelMobileStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  paddingX: 5,
  width: "100%",
  backgroundColor: "white",
  maxHeight: "100%",
};
const midPanelStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  paddingX: 5,
  backgroundColor: "white",
  width: "69%",
  overflow: "auto",
  maxHeight: "100%",
};

const rightPanelStyle = {
  display: "flex",
  alignItems: "flex-start",
  border: "1px solid #ccc",
  backgroundColor: "white",
  flexDirection: "column",
  maxHeight: "100%",
  overflow: "auto",
};
const rightPanelMobieStyle = {
  display: "flex",
  alignItems: "flex-start",
  border: "1px solid #ccc",
  backgroundColor: "white",
  flexDirection: "column",
  maxHeight: "100%",
  overflow: "auto",
  width: "100%",
};

const radioGroupStyle = {
  flexDirection: "row",
  marginBottom: 10,
};

const tableCell = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: 80,
};
