import { Button } from "@mui/material";
import { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { createFlashCard } from "../../../api/service/FlashCardService";
import getUser from "../../../helper/User";

export default function ModalAddFlashCard({
  show,
  handleClose,
  handleFetchFlashCard,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorName, setErrorName] = useState("");

  const handleSetName = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setErrorName("Tên không được để trống");
    } else {
      setErrorName("");
    }
  };
  const handleAddFlashCard = async () => {
    if (name.length === 0) {
      setErrorName("Tên không được để trống");
    } else {
      setErrorName("");
      const user = getUser();
      await createFlashCard(name, description, user?.email);
      await handleFetchFlashCard();
      await handleClose();
    }
  };
  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>THÊM FLASH CARD</h3>
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Flash Card 1"
                  onChange={handleSetName}
                />
                <Form.Text className="text-danger">{errorName}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nhập mô tả"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button
              variant="contained"
              style={{ margin: 5 }}
              onClick={handleAddFlashCard}>
              Thêm
            </Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
