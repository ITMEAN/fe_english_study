import { Modal } from "react-bootstrap";

export default function ModalAnswerQuestion({ show, handleClose, question }) {
  console.warn(question);
 const convertIdToAlphabet = (id) => {
    return String.fromCharCode(64 + id);
  }
  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column" ,gap:5}}>
          <span
            style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 50,
                height: 50,
                textAlign: "center",
                verticalAlign: "middle",
                backgroundColor: "#E8F2FF",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "50px",
              }}>
              {question?.id}
            </div>
            &nbsp; {question?.description}
          </span>
          {question?.image && (
            <img
              src={question?.image}
              alt="combo"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          <div>
            {question?.options.map((option, index) => {
              return (
                <div key={index}>
                    <span>
                        <span style={{fontWeight:'bold'}}>{option?.name}</span>. {option.content}
                    </span>
                </div>
              );
            })}
          </div>
          <span>Đáp án: <span>{convertIdToAlphabet(question?.answerId)}</span></span>
        </div>
      </Modal.Body>
    </Modal>
  );
}
