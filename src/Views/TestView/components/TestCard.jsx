import React, { useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMessage, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getUser from "../../../helper/User";
import "../css/TestCard.css";

// Lazy load modal components
const LoginModal = lazy(() => import("../../../Components/Modal/Auth/ModalLogin"));
const RegisterModal = lazy(() => import("../../../Components/Modal/Auth/ModalRegister"));
const RegisterValidOTP = lazy(() => import("../../../Components/Modal/Auth/ModalValidOTP"));

const TestCard = React.memo((props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalValidOTP, setShowModalValidOTP] = useState(false);

  const navigation = useNavigate();

  // Handle modal display
  const handleShowModalRegister = () => {
    setShowModal(false);
    setShowModalRegister(true);
  };

  const handleShowModal = () => {
    setShowModalRegister(false);
    setShowModal(true);
  };

  const handleShowModalValidOTP = () => {
    setShowModalRegister(false);
    setShowModalValidOTP(true);
  };

  const handleStartTest = () => {
    const user = getUser();
    if (!user) {
      handleShowModal();
    } else {
      navigation(`/test/start/${props.data.id}`);
    }
  };

  // Dynamic image import
  const dataImage = [
    require("../../../asset/imge-test/test-1.avif"),
    require("../../../asset/imge-test/test-2.jpeg"),
    require("../../../asset/imge-test/test-3.jpg"),
    require("../../../asset/imge-test/test-4.jpg"),
    require("../../../asset/imge-test/test-5.jpg"),
  ];

  // Function to get a random image
  const getRandomImage = () => dataImage[Math.floor(Math.random() * dataImage.length)];

  return (
    <div className="test-card">
      <div className="test-card__image">
        <img src={getRandomImage()} alt="test" />
      </div>
      <div className="test-card__content">
        <h3 className="test-card__title">{props.data.name}</h3>
        <div className="test-card__content__info">
          <div className="test-card__content__info__item">
            <FontAwesomeIcon icon={faClock} color="black" />
            <span className="test-card__info-label">Thời gian:</span>
            <span>{props.data.time} phút</span>
          </div>
          <div className="test-card__content__info__item">
            <FontAwesomeIcon icon={faMessage} color="black"/>
            <span className="test-card__info-label">Số câu hỏi:</span>
            <span>{props.data.numberQuestion} câu hỏi</span>
          </div>
          <div className="test-card__content__info__item">
            <FontAwesomeIcon icon={faPen} color="black"/>
            <span className="test-card__info-label">Số phần:</span>
            <span>{props.data.numberPart} phần</span>
          </div>
        </div>
        <div className="test-card__content__action">
          <Button onClick={handleStartTest} variant="contained" className="test-card__action-button">
            Bắt đầu
          </Button>
          <Button variant="text" className="test-card__action-button">Xem chi tiết</Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <LoginModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleShowModalRegister={handleShowModalRegister}
        />
        <RegisterModal
          show={showModalRegister}
          handleClose={() => setShowModalRegister(false)}
          handleShowModalLogin={() => setShowModal(true)}
          handleShowRegisterValidOTP={handleShowModalValidOTP}
        />
        <RegisterValidOTP
          show={showModalValidOTP}
          handleClose={() => setShowModalValidOTP(false)}
        />
      </Suspense>
    </div>
  );
});

export default TestCard;
