import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/flash-card.css";
import { faBell, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, Suspense, lazy, useMemo } from "react";
import getUser from "../../../helper/User";
import { Check } from "@mui/icons-material";
import { addFlashCardUser, findFlashCardUser } from "../../../api/service/FlashCardService";

// Lazy load the modal components only when needed
const LoginModal = lazy(() => import("../../../Components/Modal/Auth/ModalLogin"));
const RegisterModal = lazy(() => import("../../../Components/Modal/Auth/ModalRegister"));
const RegisterValidOTP = lazy(() => import("../../../Components/Modal/Auth/ModalValidOTP"));

export default function FlashCard({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalValidOTP, setShowModalValidOTP] = useState(false);

  const navigate = useNavigate();

  const dataImage = useMemo(() => [
    require("../../../asset/flash-card/flash-card-1.jpg"),
    require("../../../asset/flash-card/flash-card-2.jpg"),
    require("../../../asset/flash-card/flash-card-3.jpg"),
    require("../../../asset/flash-card/flash-card-4.png"),
    require("../../../asset/flash-card/flash-card-5.webp"),
  ], []);

  const randomImage = useMemo(() => {
    const idRandom = Math.floor(Math.random() * dataImage.length);
    return dataImage[idRandom];
  }, [dataImage]);

  const handleShowModalRegister = () => {
    setShowModal(false);
    setShowModalRegister(true);
  };

  const handleShowModalValidOTP = () => {
    setShowModalRegister(false);
    setShowModalValidOTP(true);
  };

  const handleStartFlashCard = async (idFlashCard) => {
    const user = getUser();
    if (user) {
      try {
        const response = await findFlashCardUser(user.email, idFlashCard);
        if (response) {
          return navigate(`/flash-card/start/${idFlashCard}`);
        }
      } catch (e) {
        if (e.response?.status === 404) {
          try {
            await addFlashCardUser(user.email, idFlashCard);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
    navigate(`/flash-card/start/${idFlashCard}`);
  };

  return (
    <div className="flash-card">
      
        <div style={{ width: "50%",display:'flex' }}>
          <img src={randomImage} alt="flash-card" style={{ width: "100%",display:'flex' }} />
        </div>
    
      <div className="flash-card__content">
        <div className="flash-card__content__status">
          <Check className="flash-card__content__status__icon" />
        </div>
        <h3 className="flash-card__content__title">{data.name}</h3>
        <div className="flash-card__content__info">
          <div className="flash-card__content__info__item">
            <FontAwesomeIcon icon={faBell} color="gray"/>
            <span className="flash-card__content__info__label">Thông tin:</span>
            <span>{data.description}</span>
          </div>
          <div className="flash-card__content__info__item">
            <FontAwesomeIcon icon={faPen} color="gray"/>
            <span className="flash-card__content__info__label">Số từ:</span>
            <span>{data.vocabularies.length} từ</span>
          </div>
          <div className="flash-card__content__info__item">
            <FontAwesomeIcon icon={faUser}color="gray" />
            <span className="flash-card__content__info__label">Đăng bởi:</span>
            <span className="flash-card__content__info__creator">{data.createName}</span>
          </div>
        </div>
        <div className="flash-card__content__action">
          <Button variant="contained" onClick={() => handleStartFlashCard(data.id)} className="flash-card__action__start">
            Bắt đầu
          </Button>
          <Button variant="text" onClick={() => navigate(`/flash-card/${data.id}`)} className="flash-card__action__details">
            Xem chi tiết
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {showModal && (
          <LoginModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleShowModalRegister={handleShowModalRegister}
          />
        )}
        {showModalRegister && (
          <RegisterModal
            show={showModalRegister}
            handleClose={() => setShowModalRegister(false)}
            handleShowModalLogin={() => setShowModal(true)}
            handleShowRegisterValidOTP={handleShowModalValidOTP}
          />
        )}
        {showModalValidOTP && (
          <RegisterValidOTP
            show={showModalValidOTP}
            handleClose={() => setShowModalValidOTP(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
