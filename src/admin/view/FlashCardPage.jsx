import { Button, TextField } from "@mui/material";
import Colunm from "../../Components/layout/Colunm";
import Row from "../../Components/layout/Row";
import LayoutAdmin from "../LayoutAdmin";
import {  Table } from "react-bootstrap";
import ButtonDelete from "../component/button/ButtonDelete";
import { useEffect, useState } from "react";
import getUser from "../../helper/User";
import {
  getFlashCardByEmail,
  removeFlashCard,
} from "../../api/service/FlashCardService";
import {
  setFlashCards,
  setFlashCardSelected,
  setListVocabulary,
} from "../../redux/reducer/FlashCardReducer";
import { useDispatch, useSelector } from "react-redux";
import VocabularyModal from "../component/modal/ModalVocabularies";
import Swal from "sweetalert2";
import ModalAddFlashCard from "../component/modal/ModalAddFlashCard";

export default function FlashCardPage() {
  const flashCards = useSelector((state) => state.flashCard.flashCards);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddFlashCard, setShowModalAddFlashCard] = useState(false);
  const [total, setTotal] = useState(5);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [listNumber, setListNumber] = useState([]);
  useEffect(() => {
    const list = [];
    for (let i = 1; i <= total; i++) {
      list.push(i);
    }
    setListNumber(list);
  }, [total]);

  useEffect(() => {
    fetchFlashCard();
  }, [page]);

  const handleShowModal = (flashCard) => {
    console.log(flashCard);
    dispatch(setFlashCardSelected(flashCard));
    dispatch(setListVocabulary(flashCard.vocabularies));
    setShowModal(true);
  };

  const handleShowModalAddFlashCard = () => {
    setShowModalAddFlashCard(!showModalAddFlashCard);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const fetchFlashCard = async () => {
    try {
      const user = getUser();
      const response = await getFlashCardByEmail(user?.email, page, size);
      dispatch(setFlashCards(response.flashCards));
      setTotal(response.total);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFlashCard();
  }, []);

  const handleRemoveFlashCard = async (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      showDenyButton: true,
      confirmButtonText: `Xóa`,
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await removeFlashCard(id);
          if (response.status === 200) {
            Swal.fire("Xóa thành công", "", "success");
             
          }
          await fetchFlashCard();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  return (
    <LayoutAdmin>
      <Colunm style={{ width: "100%", padding: 10, gap: 10 }}>
        <Row>
          <Button variant="contained" color="primary" onClick={handleShowModalAddFlashCard}>
            Thêm mới
          </Button>
          <TextField
            label="Tìm kiếm"
            variant="standard"
            style={{ marginLeft: 20 }}
          />
        </Row>
        <Row style={{ overflowY: "hidden" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Người đăng</th>
                <th>Danh sách từ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flashCards.map((flashCard, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{flashCard.name}</td>
                  <td>{flashCard.description}</td>
                  <td>{flashCard.createdBy}</td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleShowModal(flashCard);
                      }}>
                      Xem
                    </Button>
                  </td>
                  <td>
                    <ButtonDelete
                      variant="contained"
                      onClick={() =>
                        handleRemoveFlashCard(flashCard.id)
                      }></ButtonDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          {listNumber.map((number) => (
            <Button
              variant="contained"
              onClick={() => setPage(number)}
              style={{
                margin: 5,
                backgroundColor: page === number ? "red" : "white",
                color: page === number ? "white" : "black",
              }}>
              {number}
            </Button>
          ))}
        </Row>
      </Colunm>
      <VocabularyModal
        handleClose={handleCloseModal}
        handeReload={fetchFlashCard}
        show={showModal}
      />
      <ModalAddFlashCard show={showModalAddFlashCard} handleClose={handleShowModalAddFlashCard} handleFetchFlashCard={fetchFlashCard}/>
    </LayoutAdmin>
  );
}
