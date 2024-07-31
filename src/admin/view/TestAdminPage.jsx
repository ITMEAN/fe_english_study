import React, { useEffect, useState } from "react";
import LayoutAdmin from "../LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAllTest } from "../../api/service/TestService";
import {  Container, Table } from "react-bootstrap";
import { setTests } from "../../redux/reducer/TestManagementReducer";
import { Button } from "@mui/material";
import { Add, Edit, ListAlt, RemoveRedEyeSharp } from "@mui/icons-material";

import './css/TestAdminPage.css';
import AddTestModal from "../component/modal/ModalAddTest";
import { useNavigate } from "react-router-dom";
export default function TestAdminPage() {
  const tests = useSelector((state) => state.testManagement.tests);
  const limit = useSelector((state) => state.testManagement.limit);
  const page = useSelector((state) => state.testManagement.page);
  const navigate = useNavigate()
  const [showModalAddTest, setShowModalAddTest] = useState(false);
  const handleShowModalAddTest = () => setShowModalAddTest(true);
  const handleCloseModalAddTest = () => setShowModalAddTest(false);
  const dispatch = useDispatch();
  

  const handleEditTest = (id) => {
    navigate(`/admin/test/add-part/${id}`);
  };


  const fetchTests = async () => {
    try {
      const response = await getAllTest(limit, page);
      dispatch(setTests(response.tests));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);
  return (
    <LayoutAdmin>
      <div className="home" >
        <h3>Danh sách bài test</h3>
        <Container fluid style={{overflow:"hidden"}}>
        <Button variant="contained" color="primary" style={{marginBottom:10}} startIcon={<Add/>} onClick={()=>navigate("/admin/test/add-test")}>Thêm bài test</Button>
        <Table className="table"  striped bordered hover size="sm" responsive="lg" variant="dark"  >
            <thead className="table-header">
                 <tr  className="table-header">
                <th>#</th>
                <th>Tên bài test</th>
                <th>Thời gian</th>
                <th>Loại Test</th>
                <th>Ngày tạo</th>
                <th>Mô tả</th>
                <th>số phần</th>
                <th>Số câu hỏi</th>
                <th>trạng thái</th>
                <th>audio</th>
                <th></th>
                </tr>
            </thead>
            <tbody className="table-body">
                {tests.map((test, index) => (
                 <React.Fragment>
                      <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{test.name}</td>
                      <td>{test.time} phút</td>
                      <td>{test.typeTest}</td>
                      <td>{test.createDate}</td>
                      <td>{test.description}</td>
                      <td>{test.numberPart}</td>
                      <td>{test.numberQuestion}</td>
                      <td>{test.active==true?<span style={{backgroundColor:'green',color:'WHITE',padding:5,borderRadius:10}}>Hiển thị</span>:<span style={{backgroundColor:'red',color:'WHITE',padding:5,borderRadius:10}}>Ẩn</span>}</td>
                      <td style={{width:'10%'}}><audio controls src={test.audio}></audio></td>
                      <td>
                        <Button variant="contained" color="primary" style={{width:'100%'}} startIcon={<Edit style={{color:'white'}}/>} onClick={()=>{handleEditTest(test.id)}}> Sửa</Button>
                        <Button variant="contained" color="secondary" style={{width:'100%'}} startIcon={<RemoveRedEyeSharp style={{color:'white'}}/>}> Ẩn</Button>
                        <Button variant="contained" color="success" style={{width:'100%'}}><ListAlt/>PHẦN THI</Button>
                      </td>
                  </tr>
                  </React.Fragment>
                 
                ))}
            </tbody>
        </Table>
        </Container>
        <AddTestModal handleClose={handleCloseModalAddTest} show={showModalAddTest}/>

      </div>
    </LayoutAdmin>
  );
}
