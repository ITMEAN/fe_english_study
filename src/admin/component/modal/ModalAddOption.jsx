import { Modal} from "react-bootstrap";



export default function AddOptionModal({
  show,
  handleClose,
}) {
 
  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <h3 style={{ textAlign: "center" }}>TẠO BÀI KIỂM TRA MƠI</h3>
        
      </Modal.Body>
    </Modal>
  );
}
