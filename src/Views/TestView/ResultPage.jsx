import { Button } from "@mui/material";
import Layout from "../../Layout";
import "./css/result.css";
import {
  AccessAlarmOutlined,
  AdsClickOutlined,
  Check,
  Close,
  FlagCircle,
  Remove,
} from "@mui/icons-material";
import { findResultById } from "../../api/service/TestService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setResult } from "../../redux/reducer/ResultReducer";
import ModalAnswerQuestion from "../../Components/Modal/result/ModalAnswerQuestion";
export default function ResultTest() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const result = useSelector((state) => state.result.result);
 
  const [showModal, setShowModal] = useState(false);
  const [questionSelected, setQuestionSelected] = useState(null);
  const handleShowModal=(question)=>{
   
    setShowModal(true);
    setQuestionSelected(question);
  }
  console.log(result);
  const fetchResult = async () => {
    try {
      const response = await findResultById(id);
      dispatch(setResult(response));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const getPercent = () => {
    return ((result.totalCorrect / result.totalQuestion) * 100).toFixed(2);
  };

  const convertNumberToCharAnswer = (number) => {
    switch (number) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      default:
        return "A";
    }
  }

  useEffect(() => {
    fetchResult();
  }, []);
  return (
    <Layout>
      <div className="container-result">
        <div className="leftContent">
          <h6>Kết quả thi</h6>
          <span style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Button variant="contained" style={{ backgroundColor: "#071952" }} onClick={() => navigation("/test-simulator")}>
              Quay lại trang đề
            </Button>
          </span>
          <div className="result-content">
            <div className="overview-content">
              <div className="overview-content-item">
                <span>
                  <Check /> Kết quả
                </span>
                {result.totalCorrect}/{result.totalQuestion}
              </div>
              <div className="overview-content-item">
                <span>
                  <AdsClickOutlined></AdsClickOutlined> chính xác
                </span>
                {getPercent()} %
              </div>
              <div className="overview-content-item">
                <span>
                  <AccessAlarmOutlined></AccessAlarmOutlined> thời gian làm bài
                </span>
                {result.time} phút
              </div>
            </div>
            <div className="result-detail">
              <div className="result-detail-number-question">
                <div className="result-detail-number-question-item">
                  <div
                    style={{
                      backgroundColor: "#3CB46E",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}>
                    <Check style={{ color: "white", fontSize: 20 }}></Check>
                  </div>
                  <h6 style={{ color: "#3CB46E" }}>Trả lời đúng</h6>
                  <h3>{result.totalCorrect}</h3>
                  <span>câu hỏi</span>
                </div>
                <div className="result-detail-number-question-item">
                  <div
                    style={{
                      backgroundColor: "#E43A45",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}>
                    <Close style={{ color: "white", fontSize: 20 }}></Close>
                  </div>
                  <h6 style={{ color: "#E43A45" }}>Trả lời sai</h6>
                  <h3>{result.totalIncorrect}</h3>
                  <span>câu hỏi</span>
                </div>
                <div className="result-detail-number-question-item">
                  <div
                    style={{
                      backgroundColor: "#71869D",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}>
                    <Remove style={{ color: "white", fontSize: 20 }}></Remove>
                  </div>
                  <h6 style={{ color: "#71869D" }}>Bỏ qua</h6>
                  <h3>{result.totalSkip}</h3>
                  <span>câu hỏi</span>
                </div>
                <div className="result-detail-number-question-item">
                  <FlagCircle
                    style={{ color: "#FFC107", fontSize: 20 }}></FlagCircle>
                  <h6 style={{ color: "#FFC107" }}>Điểm</h6>
                  <h2>{result.totalScore}</h2>
                </div>
              </div>
              <div className="result-detail-score">
                <div className="result-detail-score-item">
                  <h6 style={{ color: "#35509A" }}>Listening</h6>
                  <h2>{result.resultScoreListening}/495</h2>
                  <p>
                    Trả lời dung: {result.numberQuestionCorrectListening}/
                    {result.totalQuestionListening}
                  </p>
                </div>
                <div className="result-detail-score-item">
                  <h6 style={{ color: "#35509A" }}>Reading</h6>
                  <h2>{result.resultScoreReading}/495</h2>
                  <p>
                    Trả lời dung: {result.numberQuestionCorrectReading}/
                    {result.totalQuestionReading}
                  </p>
                </div>
              </div>
            </div>
            <div className="answer-question-content">
              <p>{result.comment}</p>
                  {result?.answerQuestions?.map((item, index) => {
                    return (
                      <div className="answer-question-item" key={index}>
                          <span style={{width:50,height:50,textAlign:'center',verticalAlign:'middle',backgroundColor:'#E8F2FF',borderRadius:'50%',justifyContent:'center',alignItems:'center',lineHeight:'50px'}}>{item.question.id}</span>
                          <span>Đáp án: <span style={{fontWeight:'bold',color:'#00D000'}}>{convertNumberToCharAnswer(item.question.idAnswer)}</span></span>
                          {
                            item.statusAnswer==="CORRECT" &&
                            <span>chọn: <span style={{fontWeight:'bold',color:'#00D000',fontStyle:'initial'}}>{convertNumberToCharAnswer(item.idAnswer)}</span></span>
                          }
                           {
                            item.statusAnswer==="SKIP" &&
                            <span><span style={{fontWeight:'bold'}}>Bỏ qua</span></span>
                          }
                           {
                            item.statusAnswer==="WRONG" &&
                            <span>chọn: <span style={{fontWeight:'bold',color:'#E82016',textDecorationLine:'line-through'}}>{convertNumberToCharAnswer(item.idAnswer)}</span></span>
                          
                          }
                          <span><Button variant="text" onClick={()=>{handleShowModal(item.question)}}>Xem chi tiết</Button></span>
                      </div>
                    );
                  })}
           </div>
          </div>
        
        
         
        </div>
        <div className="rightContent">
          
          
        </div>
      </div>
      <ModalAnswerQuestion  show={showModal} handleClose={()=>setShowModal(false)} question={questionSelected} />
    </Layout>
  );
}
