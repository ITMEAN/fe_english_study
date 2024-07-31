import { Modal, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Colunm from "../../../Components/layout/Colunm";
import {
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addVocabulary,
  removeVocabulary,
  resetVocabulary,
} from "../../../redux/reducer/FlashCardReducer";
import {
  addVocabularyToFlashcard,
  removeVocabularies,
} from "../../../api/service/FlashCardService";
import ButtonDelete from "../button/ButtonDelete";
import Swal from "sweetalert2";

export default function VocabularyModal({ show, handleClose,handeReload }) {
  const flashCardSelected = useSelector(
    (state) => state.flashCard.flashCardSelected
  );

  const idFlashCard = flashCardSelected.id;
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [img, setImg] = useState(null);
  const [audio, setAudio] = useState(null);
  const [spellings, setSpellings] = useState("");
  const listVocabularyInserted = useSelector(
    (state) => state.flashCard.listVocabularyInserted
  );
  const listVocabularyDeleted = useSelector(
    (state) => state.flashCard.listVocabularyRemvoed
  );
  console.log("listVocabularyInserted", listVocabularyInserted);
  console.log("listVocabularyDeleted", listVocabularyDeleted);

  useEffect(() => {
    console.log("flashCardSelected", flashCardSelected);
    dispatch(resetVocabulary());
  }, []);

  const [errorWord, setErrorWord] = useState("");
  const [errorMeaning, setErrorMeaning] = useState("");
  const [errorExample, setErrorExample] = useState("");
  const [errorSpellings, setErrorSpellings] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetWord = (e) => {
    if (e.target.value.length === 0) {
      setErrorWord("Từ vựng không được để trống");
      setWord("");
    } else {
      setWord(e.target.value);
      setErrorWord("");
    }
  };
  const handleSetMeaning = (e) => {
    if (e.target.value.length === 0) {
      setErrorMeaning("Ý nghĩa không được để trống");
      setMeaning("");
    } else {
      setMeaning(e.target.value);
      setErrorMeaning("");
    }
  };

  const handleSetExample = (e) => {
    if (e.target.value.length === 0) {
      setErrorExample("Ví dụ không được để trống");
      setExample("");
    } else {
      setExample(e.target.value);
      setErrorExample("");
    }
  };
  const handleSetSpellings = (e) => {
    if (e.target.value.length === 0) {
      setErrorSpellings("Phát âm không được để trống");
      setSpellings("");
    } else {
      setSpellings(e.target.value);
      setErrorSpellings("");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      for (let vocabulary of listVocabularyInserted) {
        try {

          const response = await addVocabularyToFlashcard(
            vocabulary.word,
            vocabulary.meaning,
            vocabulary.example,
            vocabulary.img,
            vocabulary.audio,
            vocabulary.spellings,
            idFlashCard
          );
          console.log(`Added vocabulary ${vocabulary.word}`);
        } catch (e) {
          console.error(`Error adding vocabulary ${vocabulary.word}:`, e);
          throw e;
        }
      }
  
      try {
        const deleteResponse = await removeVocabularies(
          listVocabularyDeleted,
          idFlashCard
        );
        console.log("Deleted vocabularies successfully");
      } catch (e) {
        console.error("Error deleting vocabularies:", e);
        throw e;
      }

       dispatch(resetVocabulary());
      await handeReload();
      setLoading(false);
  
      // Sau khi hoàn thành tất cả yêu cầu thêm mới và xóa, log và hiển thị thông báo thành công
      console.log("All operations completed successfully");
      Swal.fire({
        icon: "success",
        title: "Lưu thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };




  const dispatch = useDispatch();
  const handleAddVocabulary = () => {
    const vocabulary = {
      word,
      spellings,
      meaning,
      example,
      img,
      audio,
      id: new Date().getTime().toString(),
    };
    dispatch(addVocabulary(vocabulary));
  };
  const handleRemoveVocabulary = (vocabulary) => {
    dispatch(removeVocabulary({ vocabulary }));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ display: "flex", width: "100vw" }}
      size="xl"
      dialogClassName="modal-100w">
      <Modal.Header closeButton>
        <Modal.Title>{flashCardSelected.name}</Modal.Title>
      </Modal.Header>
      <Row style={{ display: "flex", width: "100%", padding: 10 }}>
        <Colunm style={{ width: "30%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVocabulary}>
            Thêm mới
          </Button>
          <TextField
            label="Từ vựng"
            variant="standard"
            fullWidth
            onChange={handleSetWord}
            value={word}
            helperText={errorWord}
            error={errorWord !== ""}
          />
          <TextField
            label="Phát âm"
            variant="standard"
            fullWidth
            onChange={(e) => handleSetSpellings(e)}
            value={spellings}
            helperText={errorSpellings}
            error={errorSpellings !== ""}
          />
          <TextField
            label="Ý nghĩa"
            variant="standard"
            fullWidth
            onChange={(e) => handleSetMeaning(e)}
            value={meaning}
            helperText={errorMeaning}
            error={errorMeaning !== ""}
          />
          <TextField
            label="Ví dụ"
            variant="standard"
            fullWidth
            onChange={(e) => handleSetExample(e)}
            value={example}
            helperText={errorExample}
          />
          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              gap: 5,
              flexDirection: "row",
              width: "100%",
            }}>
            <label style={{ fontWeight: "bold" }}>Hình ảnh</label>
            <input
              variant="standard"
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              gap: 5,
              flexDirection: "row",
              width: "100%",
            }}>
            <label style={{ fontWeight: "bold" }}>âm thanh</label>
            <input
              variant="standard"
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </div>
        </Colunm>
        <Colunm style={{ display: "flex", width: "70%" }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Từ vựng</th>
                <th>Phát âm</th>
                <th>Ý nghĩa</th>
                <th>Ví dụ</th>
                <th>Hình ảnh</th>
                <th>Âm thanh</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flashCardSelected.vocabularies?.map((vocabulary, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{vocabulary.word}</td>
                  <td>{vocabulary.spellings}</td>
                  <td>{vocabulary.meaning}</td>
                  <td>{vocabulary.example}</td>
                  <td>
                    {vocabulary.img ? (
                      <img
                        src={
                          typeof vocabulary.img === "string"
                            ? vocabulary.img
                            : URL.createObjectURL(vocabulary.img)
                        }
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {vocabulary.audio ? (
                      <audio
                        controls
                        src={
                          typeof vocabulary.audio === "string"
                            ? vocabulary.audio
                            : URL.createObjectURL(vocabulary.audio)
                        }
                        style={{ width: 54, height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <ButtonDelete
                      variant="contained"
                      onClick={() => handleRemoveVocabulary(vocabulary)}>
                      Xóa
                    </ButtonDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
           {loading ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#37B7C3" }}
              disabled>
              <Spinner animation="border" />
            </Button>):(
            <Button
              variant="contained"
              style={{ backgroundColor: "#37B7C3" }}
              onClick={handleSave}>
              Lưu
            </Button> )}
        </Colunm>
      </Row>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
