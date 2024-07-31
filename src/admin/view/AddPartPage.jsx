import React, { useEffect, useState, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutAdmin from "../LayoutAdmin";
import { Table } from "react-bootstrap";
import {
  ArrowForwardIosSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIdTest,
  setParts,
  setPartSelected,
} from "../../redux/reducer/AddPartReducer";
import { getTestById } from "../../api/service/TestService";

// Lazy load components
const AddQuenstionModal = lazy(() => import("../component/modal/ModalAddQuestion"));
const AddPartModal = lazy(() => import("../component/modal/ModalAddPart"));
const ButtonDelete = lazy(() => import("../component/button/ButtonDelete"));
const ButtonEdit = lazy(() => import("../component/button/ButtonEdit"));

export default function AddPartPage() {
  const parts = useSelector((state) => state.addPart.parts);
  const dispatch = useDispatch();
  const [partsIdOpen, setPartsIdOpen] = useState([0]);
  const [showModalAddQuestion, setShowModalAddQuestion] = useState(false);
  const [showModalAddPart, setShowModalAddPart] = useState(false);

  const handleShowModalAddQuestion = (idPart) => {
    dispatch(setPartSelected(idPart));
    setShowModalAddQuestion(true);
  };

  const handleShowModalAddPart = () => {
    setShowModalAddPart(!showModalAddPart);
  };

  const idTest = useParams().id;

  const fetchTest = async () => {
    try {
      const response = await getTestById(idTest);
      dispatch(setParts(response.parts));
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch(setIdTest(idTest));
    fetchTest();
  }, [idTest, dispatch]);

  const handleOpenPart = (id) => {
    if (partsIdOpen.includes(id)) {
      setPartsIdOpen(partsIdOpen.filter((item) => item !== id));
    } else {
      setPartsIdOpen([...partsIdOpen, id]);
    }
  };

  const checkOpen = (id) => {
    return partsIdOpen.includes(id);
  };

  return (
    <LayoutAdmin>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: 10,
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, flexDirection: "row" }}>
          <Link>Thông tin test</Link> <ArrowForwardIosSharp />
          <Link>Thêm phần thi</Link>
        </div>
        <h3>Phần thi</h3>
        <Button variant="contained" onClick={handleShowModalAddPart}>
          Thêm phần thi
        </Button>
        <h3>Danh sách phần thi</h3>
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Tên phần thi</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, index) => (
              <React.Fragment key={part.id}>
                <tr>
                  <td>
                    {checkOpen(index) ? (
                      <KeyboardArrowUpSharp
                        onClick={() => handleOpenPart(index)}
                      />
                    ) : (
                      <KeyboardArrowDownSharp
                        onClick={() => handleOpenPart(index)}
                      />
                    )}
                  </td>
                  <td>{index + 1}</td>
                  <td>{part.name}</td>
                  <td>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ButtonEdit variant="contained">Sửa</ButtonEdit>
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ButtonDelete variant="contained">Xóa</ButtonDelete>
                    </Suspense>
                    <Button
                      variant="contained"
                      onClick={() => handleShowModalAddQuestion(index)}
                    >
                      Thêm câu hỏi
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="7">
                    {checkOpen(index) && (
                      <div>
                        Danh sách câu hỏi
                        {/* <Row>
                          <Table
                            striped
                            responsive
                            bordered
                            hover
                            variant="dark">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Mô tả</th>
                                <th>Hình Ảnh</th>
                                <th>Ẩn câu hỏi</th>
                                <th>Ẩn lựa chọn</th>
                                <th>Lựa chọn</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Đây là câu hỏi 1</td>
                                <td>
                                  <img
                                    src="https://via.placeholder.com/150"
                                    alt="image"
                                    style={{ width: 100, height: 100 }}
                                  />
                                </td>
                                <td>Ẩn</td>
                                <td>Ẩn</td>
                                <td>
                                  <Button variant="contained">Show</Button>
                                </td>
                                <td>
                                  <ButtonEdit variant="contained">
                                    Sửa
                                  </ButtonEdit>
                                  <ButtonDelete variant="contained">
                                    Xóa
                                  </ButtonDelete>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Row> */}
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <Suspense fallback={<div>Loading...</div>}>
          <AddQuenstionModal
            show={showModalAddQuestion}
            handleClose={() => setShowModalAddQuestion(false)}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AddPartModal
            handleClose={handleShowModalAddPart}
            show={showModalAddPart}
          />
        </Suspense>
      </div>
    </LayoutAdmin>
  );
}
