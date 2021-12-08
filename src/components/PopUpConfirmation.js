import { Modal } from "react-bootstrap";

function PopUpConfirmation(props) {
  return (
    <Modal
      {...props}
      className="modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Success
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Success</h2>
        <p>
         Some text here
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="cta-button" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUpConfirmation;
